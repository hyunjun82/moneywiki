[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$src = 'C:\Users\user\Downloads'
$dst = 'C:\Users\user\wiki-site\public\files\forms'

$copies = @(
  @{ from='급여대장_임금대장.hwp'; to='급여대장.hwp' },
  @{ from='급여지급명세서.hwp'; to='급여지급명세서.hwp' },
  @{ from='미사용 연차휴가 사용계획서.hwp'; to='연차휴가사용계획서.hwp' },
  @{ from='미사용 연차휴가 사용지정 통보서.hwp'; to='연차휴가사용지정통보서.hwp' },
  @{ from='미사용 연차휴가 통지 및 사용시기 지정 요청서.hwp'; to='연차휴가사용시기지정요청서.hwp' },
  @{ from='업무보고서.hwp'; to='업무보고서.hwp' },
  @{ from='업무인수인계서.xls'; to='업무인수인계서.xls' },
  @{ from='업무일지88.hwp'; to='업무일지.hwp' },
  @{ from='여비교통비지출품의서.hwp'; to='여비교통비지출품의서.hwp' },
  @{ from='인사기록카드.hwp'; to='인사기록카드.hwp' },
  @{ from='임금계산서.hwp'; to='임금계산서.hwp' },
  @{ from='임금대장.hwp'; to='임금대장.hwp' },
  @{ from='조퇴및결근신청서.hwp'; to='조퇴결근신청서.hwp' },
  @{ from='직원근무평가서.hwp'; to='직원근무평가서.hwp' },
  @{ from='차량운행일지.hwp'; to='차량운행일지.hwp' },
  @{ from='채용면접기록표.hwp'; to='채용면접기록표.hwp' },
  @{ from='퇴.휴직_신고서.hwp'; to='퇴직휴직신고서.hwp' },
  @{ from='퇴직급_지급품의서.hwp'; to='퇴직금지급품의서.hwp' },
  @{ from='퇴직급여충당금조정명세서.hwp'; to='퇴직급여충당금조정명세서.hwp' },
  @{ from='피보험자_및_피부양자_신규자격취득신고서.hwp'; to='피보험자신규자격취득신고서.hwp' },
  @{ from='피복등지급대장.hwp'; to='피복지급대장.hwp' },
  @{ from='학자금지급신청서.hwp'; to='학자금지급신청서.hwp' },
  @{ from='해외훈련이수자관리기록카드.hwp'; to='해외훈련이수자관리기록카드.hwp' },
  @{ from='현장실습일지.hwp'; to='현장실습일지.hwp' },
  @{ from='회람.hwp'; to='회람.hwp' },
  @{ from='회사경조금지급신청서.hwp'; to='사망조위금청구서.hwp' },
  @{ from='회사경조금지급신청서.hwp'; to='재해부조금청구서.hwp' },
  @{ from='휴(공)가원.hwp'; to='공가신청서.hwp' },
  @{ from='휴,퇴직자_관리명세서.hwp'; to='휴직자퇴직자관리명세서.hwp' },
  @{ from='휴가원.hwp'; to='휴가원.hwp' },
  @{ from='휴일_출근.시간외_근무신청(지시)서.hwp'; to='시간외근무신청서.hwp' },
  @{ from='휴직원.hwp'; to='휴직원.hwp' },
  @{ from='거래명세표 양식.hwp'; to='거래명세표.hwp' },
  @{ from='개인경비 물품구매 품의서 양식.xls'; to='사무용품청구의뢰서.xls' }
)

$ok = 0; $fail = 0
foreach ($c in $copies) {
  $srcPath = Join-Path $src $c.from
  $dstPath = Join-Path $dst $c.to
  if (Test-Path $srcPath) {
    Copy-Item -Path $srcPath -Destination $dstPath -Force
    Write-Host "OK: $($c.to)"
    $ok++
  } else {
    Write-Host "MISS: $($c.from)"
    $fail++
  }
}
Write-Host "완료: $ok 개 복사, $fail 개 없음"
