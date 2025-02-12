param ($packageJson, $version)

$jsonContent = Get-Content -Path $packageJson -Raw | ConvertFrom-Json

$jsonContent.version = $version

$jsonContent | ConvertTo-Json -Depth 100 | Set-Content -Path $packageJson
