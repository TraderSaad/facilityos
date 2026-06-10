Write-Host "Installing dependencies..."
npm install
Copy-Item .env.example .env -ErrorAction SilentlyContinue
