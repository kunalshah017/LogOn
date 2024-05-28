# Powershell script to setup environment or start the server

# Function to install npm packages
function Install-NpmPackages {
    param (
        [string]$directory
    )

    Write-Host "Setting up the $directory environment..."
    Set-Location -Path $directory

    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install $directory dependencies." -ForegroundColor Red
        exit $LASTEXITCODE
    }

    Set-Location -Path ".."
}

# Function to create .env file
function Create-EnvFile {
    param (
        [string]$directory,
        [string]$mongoUri,
        [string]$jwtSecret
    )

    $envFilePath = Join-Path -Path $directory -ChildPath ".env"
    Write-Host "Creating .env file in $directory..."

    @"
MDB_URI="$mongoUri"
JWT_SECRET="$jwtSecret"
"@ | Out-File -FilePath $envFilePath -Encoding utf8

    Write-Host ".env file created." -ForegroundColor Green
}

# Function to start npm server in a new PowerShell window
function Start-NpmServer {
    param (
        [string]$directory,
        [string]$command
    )

    $script = @"
        Set-Location -Path $directory
        npm run $command
"@

    $encodedScript = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($script))
    Start-Process powershell -ArgumentList "-NoExit", "-EncodedCommand", $encodedScript
}

# Main script
try {
    $choice = Read-Host "Enter 1 to setup environment, or 2 to start the server"

    if ($choice -eq '1') {
        $mongoUri = Read-Host "Enter your MongoDB URI"
        $jwtSecret = Read-Host "Enter your JWT Secret Key"

        Install-NpmPackages -directory "frontend"
        Install-NpmPackages -directory "backend"
        Create-EnvFile -directory "backend" -mongoUri $mongoUri -jwtSecret $jwtSecret

        Write-Host "Environment setup complete." -ForegroundColor Green
    }
    elseif ($choice -eq '2') {
        Start-NpmServer -directory "frontend" -command "dev"
        Start-NpmServer -directory "backend" -command "serve"
    }
    else {
        Write-Host "Invalid choice. Please run the script again and enter 1 or 2." -ForegroundColor Red
    }
}
catch {
    Write-Host "An error occurred: $_" -ForegroundColor Red
}

pause
