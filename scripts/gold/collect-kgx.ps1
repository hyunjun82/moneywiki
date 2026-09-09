# 한국금거래소 고시 수집 → price-data 브랜치 push (사용자 PC 예약 실행용)
#
# 한국금거래소 API 는 해외 IP 를 403 으로 막아 GitHub Actions 에서 돌릴 수 없다.
# 이 스크립트를 PC 에서 평일 09:30~18:30 30분 간격으로 돌린다 (2026-09-09, 스펙 4절).
#
# 예약 등록 (관리자 권한 불필요, 한 줄):
#   schtasks /Create /TN "MoneyWiki KGX" /SC WEEKLY /D MON,TUE,WED,THU,FRI /ST 09:30 /RI 30 /DU 09:00 /F /TR "powershell -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File C:\Users\user\wiki-site\scripts\gold\collect-kgx.ps1"
# 해제:
#   schtasks /Delete /TN "MoneyWiki KGX" /F
# Cowork 예약 작업으로 돌리려면 작업 내용을 "wiki-site 에서 npm run gold:collect:push 실행" 한 줄로
# 두면 된다. 판단이 필요 없는 스크립트 실행이라 모델은 Sonnet 이면 충분하다.
#
# 동작:
#   %LOCALAPPDATA%\moneywiki\price-data 에 price-data 브랜치를 얕게 받아 두고(최초 1회 자동),
#   pull → 수집기(collect-kgx.mjs) 실행 → kgx-quotes.json 이 바뀌었을 때만 [CI Skip] 커밋·push.
#   처음 실행이면 1년치를 백필한다. 로그: %LOCALAPPDATA%\moneywiki\collect-kgx.log

$ErrorActionPreference = "Stop"

$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)   # scripts\gold → 저장소 루트
$base = Join-Path $env:LOCALAPPDATA "moneywiki"
$data = Join-Path $base "price-data"
$log  = Join-Path $base "collect-kgx.log"
$file = Join-Path $data "kgx-quotes.json"
$collector = Join-Path $repo "scripts\gold\collect-kgx.mjs"

New-Item -ItemType Directory -Force $base | Out-Null

function Log([string]$m) {
  $line = "{0} {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $m
  Add-Content -Path $log -Value $line -Encoding utf8
  Write-Host $line
}

try {
  if (-not (Test-Path (Join-Path $data ".git"))) {
    Log "price-data 브랜치 클론 → $data"
    git clone --quiet --branch price-data --single-branch --depth 1 https://github.com/hyunjun82/moneywiki.git $data
    if ($LASTEXITCODE -ne 0) { throw "git clone 실패 ($LASTEXITCODE)" }
  }

  git -C $data pull --quiet --rebase origin price-data
  if ($LASTEXITCODE -ne 0) { throw "git pull 실패 ($LASTEXITCODE)" }

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

  $after = (Get-FileHash $file).Hash
  if ($before -eq $after) { Log "변경 없음 — push 생략"; exit 0 }

  git -C $data add kgx-quotes.json
  $stamp = Get-Date -Format "yyyy-MM-ddTHH:mmK"
  git -C $data -c user.name="kgx-collector" -c user.email="kgx-collector@jjyu.co.kr" commit --quiet -m "[CI Skip] kgx quotes $stamp"
  if ($LASTEXITCODE -ne 0) { throw "git commit 실패 ($LASTEXITCODE)" }
  git -C $data push --quiet origin HEAD:price-data
  if ($LASTEXITCODE -ne 0) { throw "git push 실패 ($LASTEXITCODE)" }
  Log "push 완료"
  exit 0
} catch {
  Log ("오류: " + $_.Exception.Message)
  exit 1
}
