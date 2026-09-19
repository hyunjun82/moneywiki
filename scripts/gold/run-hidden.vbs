' MoneyWiki KGX 예약 작업 래퍼 — 콘솔 창 없이 collect-kgx.ps1 을 실행한다 (2026-09-20).
' powershell.exe 를 예약 작업이 직접 띄우면 -WindowStyle Hidden 이어도 창이 잠깐 떴다 사라진다.
Dim sh, ps1
Set sh = CreateObject("WScript.Shell")
ps1 = Replace(WScript.ScriptFullName, "run-hidden.vbs", "collect-kgx.ps1")
sh.Run "powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File """ & ps1 & """", 0, False
