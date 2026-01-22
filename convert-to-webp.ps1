# PowerShell script to convert images to WebP format
# Requires: ImageMagick

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Image to WebP Conversion Script" -ForegroundColor Green
Write-Host "  Portfolio Optimization Tool" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if ImageMagick is installed
$magickInstalled = Get-Command magick -ErrorAction SilentlyContinue

if (-not $magickInstalled) {
    Write-Host "❌ ImageMagick not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ImageMagick first:" -ForegroundColor Yellow
    Write-Host "  Option 1: winget install ImageMagick.ImageMagick" -ForegroundColor Cyan
    Write-Host "  Option 2: choco install imagemagick" -ForegroundColor Cyan
    Write-Host "  Option 3: Download from https://imagemagick.org/script/download.php" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "✅ ImageMagick found!" -ForegroundColor Green
Write-Host ""

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

Write-Host "📊 Found $($images.Count) images to convert" -ForegroundColor Cyan
Write-Host ""

$totalOriginalSize = 0
$totalWebpSize = 0
$convertedCount = 0
$skippedCount = 0
$errorCount = 0

foreach ($image in $images) {
    if (Test-Path $image) {
        $webpPath = $image -replace '\.(jpg|jpeg|png)$', '.webp'
        
        # Check if WebP already exists
        if (Test-Path $webpPath) {
            Write-Host "⏭️  Skipping: $image (WebP already exists)" -ForegroundColor Yellow
            $skippedCount++
            continue
        }
        
        Write-Host "🔄 Converting: $image" -ForegroundColor Cyan
        
        try {
            # Convert with quality 85 (good balance between size and quality)
            $result = magick convert $image -quality 85 $webpPath 2>&1
            
            if (Test-Path $webpPath) {
                $originalSize = (Get-Item $image).Length / 1KB
                $webpSize = (Get-Item $webpPath).Length / 1KB
                $savings = [math]::Round((($originalSize - $webpSize) / $originalSize) * 100, 2)
                
                $totalOriginalSize += $originalSize
                $totalWebpSize += $webpSize
                $convertedCount++
                
                Write-Host "   ✅ Original: $([math]::Round($originalSize, 2)) KB" -ForegroundColor Gray
                Write-Host "   ✅ WebP: $([math]::Round($webpSize, 2)) KB" -ForegroundColor Gray
                Write-Host "   💾 Savings: $savings%" -ForegroundColor Green
                Write-Host ""
            } else {
                Write-Host "   ❌ Conversion failed" -ForegroundColor Red
                $errorCount++
            }
        } catch {
            Write-Host "   ❌ Error: $_" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "❌ File not found: $image" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Conversion Summary" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Statistics:" -ForegroundColor Cyan
Write-Host "   ✅ Converted: $convertedCount images" -ForegroundColor Green
Write-Host "   ⏭️  Skipped: $skippedCount images" -ForegroundColor Yellow
Write-Host "   ❌ Errors: $errorCount images" -ForegroundColor Red
Write-Host ""

if ($convertedCount -gt 0) {
    $totalSavings = [math]::Round((($totalOriginalSize - $totalWebpSize) / $totalOriginalSize) * 100, 2)
    
    Write-Host "💾 Size Reduction:" -ForegroundColor Cyan
    Write-Host "   Original: $([math]::Round($totalOriginalSize, 2)) KB" -ForegroundColor Gray
    Write-Host "   WebP: $([math]::Round($totalWebpSize, 2)) KB" -ForegroundColor Gray
    Write-Host "   Saved: $([math]::Round($totalOriginalSize - $totalWebpSize, 2)) KB ($totalSavings%)" -ForegroundColor Green
    Write-Host ""
}

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($convertedCount -gt 0) {
    Write-Host "🎉 Conversion complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Update HTML to use <picture> elements with WebP" -ForegroundColor White
    Write-Host "   2. Update Service Worker (sw.js) to cache WebP images" -ForegroundColor White
    Write-Host "   3. Test in different browsers" -ForegroundColor White
    Write-Host "   4. Keep original images as fallback" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 See WEBP_CONVERSION_GUIDE.md for detailed instructions" -ForegroundColor Cyan
} else {
    Write-Host "ℹ️  No images were converted." -ForegroundColor Yellow
    if ($skippedCount -gt 0) {
        Write-Host "   All images already have WebP versions." -ForegroundColor Gray
    }
}

Write-Host ""
Read-Host "Press Enter to exit"
