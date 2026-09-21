# 한국금거래소 고시 수집 → price-data 브랜치 push (사용자 PC 예약 실행용)
#
# 한국금거래소 API 는 해외 IP 를 403 으로 막아 GitHub Actions 에서 돌릴 수 없다.
# 이 스크립트를 PC 에서 평일 09:30~18:30 30분 간격으로 돌린다 (2026-09-09, 스펙 4절).
#
# 예약 등록 (관리자 권한 불필요, 한 줄). wscript 로 감싸야 30분마다 콘솔 창이 깜빡이지 않는다
# (powershell -WindowStyle Hidden 은 대화형 로그온 작업에서 창이 잠깐 떴다 사라진다 — 2026-09-20):
#   schtasks /Create /TN "MoneyWiki KGX" /SC WEEKLY /D MON,TUE,WED,THU,FRI /ST 09:30 /RI 30 /DU 09:00 /F /TR "wscript.exe \"C:\Users\user\wiki-site\scripts\gold\run-hidden.vbs\""
# 해제:
#   schtasks /Delete /TN "MoneyWiki KGX" /F
# Cowork 예약 작업으로 돌리려면 작업 내용을 "wiki-site 에서 npm run gold:collect:push 실행" 한 줄로
# 두면 된다. 판단이 필요 없는 스크립트 실행이라 모델은 Sonnet 이면 충분하다.
#
# 동작:
#   %LOCALAPPDATA%\moneywiki\price-data 에 price-data 브랜치를 얕게 받아 두고(최초 1회 자동),
#   원격 최신으로 리셋 → 수집기(collect-kgx.mjs) → gold.json 생성기(build-gold-json.mjs) →
#   바뀌었을 때만 [CI Skip] 커밋·push(충돌하면 최신 위에 다시 얹어 최대 3회).
#   처음 실행이면 1년치를 백필한다. 로그: %LOCALAPPDATA%\moneywiki\collect-kgx.log
#   클론이 깨져 fetch 가 실패하면(2026-09-16~18 index 손상으로 사흘 멈춤) 폴더를 *.broken-* 으로 치우고 새로 받는다.
#
# 기사 발행 (2026-09-20 추가 — GitHub 예약(cron)이 4시간씩 늦게 떠서 10시 기사가 오후 3시에 나오던 것을 PC 가 맡는다):
#   평일 10:00~11:59 실행분에서 오늘 고시가 있고 main 에 오늘 기사가 없으면
#   %LOCALAPPDATA%\moneywiki\main (main 얕은 클론) 에서 generate-news.mjs --require-today 를 돌려
#   src/data/gold-news/<오늘>.json 을 커밋·push 하고 IndexNow 에 알린다. 하루 한 번만 발행한다.
#   gold-news.yml 의 예약 1개(10:20 KST)는 PC 가 못 했을 때의 예비다.

$ErrorActionPreference = "Stop"
# node 가 찍는 한글이 로그에 깨져 남지 않도록 (Windows PowerShell 5.1 기본은 CP949)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)   # scripts\gold → 저장소 루트
$base = Join-Path $env:LOCALAPPDATA "moneywiki"
$data = Join-Path $base "price-data"
$log  = Join-Path $base "collect-kgx.log"
$file = Join-Path $data "kgx-quotes.json"
$gold = Join-Path $data "gold.json"
$collector = Join-Path $repo "scripts\gold\collect-kgx.mjs"
$builder = Join-Path $repo "scripts\gold\build-gold-json.mjs"

New-Item -ItemType Directory -Force $base | Out-Null

function Log([string]$m) {
  $line = "{0} {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $m
  Add-Content -Path $log -Value $line -Encoding utf8
  Write-Host $line
}

<#
  클론을 원격 price-data 와 똑같이 만든다. 로컬 변경·중단된 리베이스·충돌 표시를 전부 버린다.
  정리 명령은 cmd /c 로 감싼다 — Windows PowerShell 5.1 은 네이티브 명령의 stderr 를 ErrorRecord 로
  감싸고, 이 스크립트의 ErrorActionPreference = "Stop" 이 그것을 예외로 바꾼다.
  실제로 2026-09-11 에 `git rebase --abort 2>$null` 이 "no rebase in progress" 를 뱉는 순간 예외가 나서
  뒤따르던 복구(reset --hard)가 실행되지 않았고, 그래서 클론이 충돌 상태로 굳었다.
#>
function Clone-Branch([string]$branch, [string]$dir) {
  Log "$branch 브랜치 클론 → $dir"
  git clone --quiet --branch $branch --single-branch --depth 1 https://github.com/hyunjun82/moneywiki.git $dir
  if ($LASTEXITCODE -ne 0) { throw "git clone 실패 ($LASTEXITCODE)" }
  # 데이터 파일은 LF 로 둔다 (GitHub Actions 갱신기와 같은 줄바꿈 — CRLF 경고·불필요한 diff 방지)
  git -C $dir config core.autocrlf false
}

<#
  클론을 원격과 똑같이 만든다. fetch 가 실패하면(index 손상 등) 폴더를 치우고 새로 받는다 —
  2026-09-16 .git/index 가 0 으로 채워져 "bad signature" 로 사흘간 30분마다 실패만 쌓였다.
#>
function Sync-Remote([string]$branch, [string]$dir) {
  cmd /c "git -C ""$dir"" rebase --abort >nul 2>nul"
  cmd /c "git -C ""$dir"" merge --abort >nul 2>nul"
  git -C $dir fetch --quiet --depth 1 origin $branch
  if ($LASTEXITCODE -ne 0) {
    Log "git fetch 실패 ($LASTEXITCODE) — 클론을 치우고 새로 받는다"
    $broken = (Split-Path -Leaf $dir) + ".broken-" + (Get-Date -Format "yyyyMMdd-HHmmss")
    Rename-Item -Path $dir -NewName $broken -ErrorAction Stop
    Clone-Branch $branch $dir
    return
  }
  git -C $dir reset --quiet --hard FETCH_HEAD
  if ($LASTEXITCODE -ne 0) { throw "git reset 실패 ($LASTEXITCODE)" }
}

<#
  오늘 기사 발행 — 평일 10:00~11:59, 오늘 고시가 있고 main 에 오늘 기사가 없을 때 한 번.
  generate-news.mjs 는 main 클론 안의 것을 쓴다(발행된 코드와 같은 생성기). gold.json 은 방금 만든 로컬 파일,
  price.json(도매·환율·국제·거시)은 price-data 브랜치 최신을 쓴다.
#>
function Publish-News {
  $now = Get-Date
  if ($now.DayOfWeek -in "Saturday", "Sunday") { return }
  if ($now.Hour -lt 10 -or $now.Hour -gt 11) { return }
  $today = $now.ToString("yyyy-MM-dd")
  $latestQuoteDate = (node -e "console.log(JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')).retail.latest.date)" $gold).Trim()
  if ($latestQuoteDate -ne $today) { Log "기사: 당일 고시 아직 없음($latestQuoteDate) — 발행 보류"; return }

  $main = Join-Path $base "main"
  if (-not (Test-Path (Join-Path $main ".git"))) { Clone-Branch "main" $main }
  Sync-Remote "main" $main
  $art = Join-Path $main "src\data\gold-news\$today.json"
  if (Test-Path $art) { Log "기사: 오늘($today) 기사가 이미 main 에 있음 — 생략"; return }

  $gen = Join-Path $main "scripts\gold\generate-news.mjs"
  $outDir = Join-Path $main "src\data\gold-news"
  # 해석 문단은 구독 claude -p(opus)가 쓴다(scripts/gold/lib/news-analysis.mjs) — 호출기가 scripts/.no-mcp.json 을
  # 현재 폴더 기준으로 만들므로 main 클론 안에서 돌린다. 모델이 실패하면 조립 문장으로 그대로 발행된다(막지 않음).
  Push-Location $main
  try { $stdout = & node $gen $outDir --require-today --gold $gold; $code = $LASTEXITCODE }
  finally { Pop-Location }
  foreach ($line in $stdout) { Log ("기사: " + $line) }
  if ($code -eq 3) { Log "기사: 생성기가 당일 고시 없음으로 판단 — 발행 보류"; return }
  if ($code -ne 0) { throw "기사 생성 실패 (exit $code)" }
  if (-not (Test-Path $art)) { throw "기사 파일이 생기지 않음: $art" }

  git -C $main add "src/data/gold-news/$today.json"
  git -C $main -c user.name="gold-news-bot" -c user.email="actions@github.com" commit --quiet -m "feat: 금시세 뉴스 $today 자동 발행"
  if ($LASTEXITCODE -ne 0) { throw "기사 커밋 실패 ($LASTEXITCODE)" }
  $ok = $false
  for ($t = 1; $t -le 2 -and -not $ok; $t++) {
    git -C $main push --quiet origin HEAD:main
    if ($LASTEXITCODE -eq 0) { $ok = $true; break }
    Log "기사 push 충돌 — 최신 main 위에 다시 얹는다 ($t/2)"
    git -C $main fetch --quiet --depth 1 origin main
    git -C $main rebase --quiet FETCH_HEAD
    if ($LASTEXITCODE -ne 0) { cmd /c "git -C ""$main"" rebase --abort >nul 2>nul"; throw "기사 rebase 실패" }
  }
  if (-not $ok) { throw "기사 push 2회 실패 — 예비 워크플로(gold-news.yml)가 맡는다" }
  Log "기사 발행 완료: /gold/news/$today (Cloudflare 빌드 후 반영)"

  try {
    $body = @{
      host = "www.jjyu.co.kr"
      key = "cf14d2ece5b0438e848760be86604782"
      keyLocation = "https://www.jjyu.co.kr/cf14d2ece5b0438e848760be86604782.txt"
      urlList = @("https://www.jjyu.co.kr/gold/news/$today", "https://www.jjyu.co.kr/gold/news", "https://www.jjyu.co.kr/gold")
    } | ConvertTo-Json
    Invoke-RestMethod -Method Post -Uri "https://api.indexnow.org/indexnow" -ContentType "application/json; charset=utf-8" -Body $body | Out-Null
    Log "IndexNow 알림 완료"
  } catch {
    Log ("IndexNow 실패(무시): " + $_.Exception.Message)
  }
}

try {
  if (-not (Test-Path (Join-Path $data ".git"))) { Clone-Branch "price-data" $data }

  # 원격 최신을 그대로 받아 그 위에 파일만 다시 얹는다. 병합·리베이스는 하지 않는다.
  # gold.json 은 이 PC 와 GitHub Actions(gold-price.yml)가 둘 다 쓰기 때문에 pull --rebase 를 하면
  # 언젠가 반드시 충돌하고, 예약 실행은 아무도 풀어 주지 않아 클론이 UU 상태로 굳는다.
  # 2026-09-11 09:30 에 그렇게 굳어 사흘(9/11·9/12 기사 누락) 동안 수집이 멈췄다.
  # 여기서 버리는 로컬 변경은 아래 수집기·생성기가 다시 만드는 두 파일뿐이라 잃을 것이 없다.
  Sync-Remote "price-data" $data

  $stamp = Get-Date -Format "yyyy-MM-ddTHH:mmK"
  $pushed = $false

  for ($try = 1; $try -le 3 -and -not $pushed; $try++) {
    $before = ""
    if (Test-Path $file) { $before = (Get-FileHash $file).Hash }

    $extra = @()
    if ($before -eq "") {
      $extra = @("--backfill", (Get-Date).AddYears(-1).ToString("yyyy.MM.dd"))
      Log "kgx-quotes.json 없음 — 1년치 백필"
    }

    $stdout = & node $collector --out $data @extra
    $code = $LASTEXITCODE
    foreach ($line in $stdout) { Log $line }
    if ($code -ne 0) { throw "수집기 실패 (exit $code)" }

    # gold.json — 화면이 읽는 파일. 고시가 그대로여도 기준가(국제 시세×환율)가 움직이므로 매번 만든다.
    $goldBefore = ""
    if (Test-Path $gold) { $goldBefore = (Get-FileHash $gold).Hash }
    $stdout2 = & node $builder $data
    $code2 = $LASTEXITCODE
    foreach ($line in $stdout2) { Log $line }
    if ($code2 -ne 0) { throw "gold.json 생성 실패 (exit $code2)" }

    $after = (Get-FileHash $file).Hash
    $goldAfter = (Get-FileHash $gold).Hash
    if ($before -eq $after -and $goldBefore -eq $goldAfter) { Log "변경 없음 — push 생략"; $pushed = $true; break }

    git -C $data add kgx-quotes.json gold.json
    git -C $data -c user.name="kgx-collector" -c user.email="kgx-collector@jjyu.co.kr" commit --quiet -m "[CI Skip] kgx quotes $stamp"
    if ($LASTEXITCODE -ne 0) { throw "git commit 실패 ($LASTEXITCODE)" }

    git -C $data push --quiet origin HEAD:price-data
    if ($LASTEXITCODE -eq 0) { $pushed = $true; break }

    # Actions 갱신기가 같은 순간에 밀어 넣은 경우 — 그 최신 위에 파일을 다시 얹어 재시도한다
    Log "push 충돌 — 원격 최신 위에 다시 얹는다 ($try/3)"
    Sync-Remote "price-data" $data
  }

  if (-not $pushed) { throw "git push 3회 실패 — 다음 예약 실행에서 재시도" }
  Log "수집 완료"

  # 시세가 올라간 뒤 기사 — 실패해도 시세 수집은 이미 끝났으므로 로그만 남긴다
  try { Publish-News } catch { Log ("기사 오류: " + $_.Exception.Message) }
  exit 0
} catch {
  Log ("오류: " + $_.Exception.Message)
  exit 1
}
