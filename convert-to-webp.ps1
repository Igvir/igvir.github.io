# PowerShell script to convert images to WebP format
# Requires: Install ImageMagick or use online converter

Write-Host "Image to WebP Conversion Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check if ImageMagick is installed
$magickInstalled = Get-Command magick -ErrorAction SilentlyContinue

if (-not $magickInstalled) {
    Write-Host "ImageMagick not found. Please install it first:" -ForegroundColor Yellow
    Write-Host "  winget install ImageMagick.ImageMagick" -ForegroundColor Cyan
    Write-Host "  or download from: https://imagemagick.org/script/download.php" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Use online converter at https://cloudconvert.com/jpg-to-webp" -ForegroundColor Yellow
    exit
}

# Images to convert
$images = @(
    "images/avatar.jpg",
    "images/banner.jpg",
    "images/banner5-white-small.png",
    "images/perfil-24.jpg",
    "images/pic01.jpg",
    "images/pic02.jpg",
    "images/pic03.jpg",
    "images/aws-cda-2023.png",
    "images/aws-cp-2020.png",
    "images/aws-sa-2020.png",
    "images/aws-sap-2022.png",
    "images/aws-sysops-admin-2024.png",
    "images/gbm-powers-2020.png",
    "images/togaf9.png"
)

Write-Host "Converting images to WebP format..." -ForegroundColor Green
Write-Host ""

foreach ($image in $images) {
    if (Test-Path $image) {
        $webpPath = $image -replace '\.(jpg|jpeg|png)$', '.webp'
        
        Write-Host "Converting: $image -> $webpPath" -ForegroundColor Cyan
        
        # Convert with quality 85 (good balance between size and quality)
        magick convert $image -quality 85 $webpPath
        
        if (Test-Path $webpPath) {
            $originalSize = (Get-Item $image).Length / 1KB
            $webpSize = (Get-Item $webpPath).Length / 1KB
            $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 2)
            
            Write-Host "  Original: $([math]::Round($originalSize, 2)) KB" -ForegroundColor Gray
            Write-Host "  WebP: $([math]::Round($webpSize, 2)) KB" -ForegroundColor Gray
            Write-Host "  Savings: $savings%" -ForegroundColor Green
            Write-Host ""
        }
    } else {
        Write-Host "File not found: $image" -ForegroundColor Red
    }
}

Write-Host "Conversion complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update HTML to use <picture> elements with WebP fallback" -ForegroundColor White
Write-Host "2. Test images in different browsers" -ForegroundColor White
Write-Host "3. Keep original images as fallback for older browsers" -ForegroundColor White
