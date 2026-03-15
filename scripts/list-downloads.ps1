[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$files = Get-ChildItem 'C:\Users\user\Downloads' | Where-Object { $_.Extension -match '\.(hwp|xls|xlsx)$' }
foreach ($f in $files) {
    Write-Output $f.Name
}
