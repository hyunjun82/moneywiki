Get-ChildItem -Path "src" -Include "*.tsx","*.ts" -Recurse | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    if ($content -match 'emerald') {
        $content = $content -replace 'emerald-800', '[#132A42]'
        $content = $content -replace 'emerald-700', '[#162F4F]'
        $content = $content -replace 'emerald-600', '[#1E3A5F]'
        $content = $content -replace 'emerald-500', '[#2B5280]'
        $content = $content -replace 'emerald-400', '[#4A7AB5]'
        $content = $content -replace 'emerald-300', '[#4A7AB5]'
        $content = $content -replace 'emerald-200', '[#B8D0E8]'
        $content = $content -replace 'emerald-100', '[#EDF2F8]'
        $content = $content -replace 'emerald-50', '[#F5F8FB]'
        [System.IO.File]::WriteAllText($_.FullName, $content)
        Write-Host "Updated: $($_.FullName)"
    }
}
Write-Host "Done!"
