param ($chart, $values, $version)

# Install and import the `powershell-yaml` module
# Install module has a -Force -Verbose -Scope CurrentUser arguments which might be necessary in your CI/CD environment to install the module
Install-Module -Name powershell-yaml -Force -Verbose -Scope CurrentUser
Import-Module powershell-yaml

# LoadYml function that will read YML file and deserialize it
function LoadYml {
    param (
        $FileName
    )
	# Load file content to a string array containing all YML file lines
    [string[]]$fileContent = Get-Content $FileName
    $content = ''
    # Convert a string array to a string
    foreach ($line in $fileContent) { $content = $content + "`n" + $line }
    # Deserialize a string to the PowerShell object
    $yml = ConvertFrom-YAML $content
    # return the object
    Write-Output $yml
}

# WriteYml function that writes the YML content to a file
function WriteYml {
    param (
        $FileName,
        $Content
    )
	#Serialize a PowerShell object to string
    $result = ConvertTo-YAML $Content
    #write to a file
    Set-Content -Path $FileName -Value $result
}

# Loading yml, setting new values and writing it back to disk
# Modification du fichier Chart.yml
$yml = LoadYml $chart
$yml.appVersion = $version
$chartVersion = [version]$yml.version
$yml.version = "{0}.{1}.{2}" -f $chartVersion.Major, $chartVersion.Minor, ($chartVersion.Build+1)
WriteYml $chart $yml

# Modification du fichier values.yml
$yml = LoadYml $values
$yml.front.tag = $version 
WriteYml $values $yml
