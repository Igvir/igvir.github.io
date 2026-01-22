# Script de Verificación de Optimización
# Verifica que todos los cambios se hayan aplicado correctamente

Write-Host "🔍 Verificando Optimización..." -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Verificar archivos de backup
Write-Host "📁 Verificando backups..." -ForegroundColor Yellow
if (Test-Path "index-backup.html") {
    Write-Host "  ✅ index-backup.html existe" -ForegroundColor Green
} else {
    Write-Host "  ❌ index-backup.html NO existe" -ForegroundColor Red
    $errors++
}

if (Test-Path "es/index-backup.html") {
    Write-Host "  ✅ es/index-backup.html existe" -ForegroundColor Green
} else {
    Write-Host "  ❌ es/index-backup.html NO existe" -ForegroundColor Red
    $errors++
}

Write-Host ""

# Verificar archivos nuevos
Write-Host "📄 Verificando archivos nuevos..." -ForegroundColor Yellow
if (Test-Path "assets/js/main-vanilla.js") {
    Write-Host "  ✅ main-vanilla.js existe" -ForegroundColor Green
} else {
    Write-Host "  ❌ main-vanilla.js NO existe" -ForegroundColor Red
    $errors++
}

if (Test-Path "assets/css/critical.css") {
    Write-Host "  ✅ critical.css existe" -ForegroundColor Green
} else {
    Write-Host "  ❌ critical.css NO existe" -ForegroundColor Red
    $errors++
}

Write-Host ""

# Verificar contenido de index.html
Write-Host "🔎 Verificando index.html..." -ForegroundColor Yellow
$indexContent = Get-Content "index.html" -Raw

if ($indexContent -match "main-vanilla\.js") {
    Write-Host "  ✅ Usa main-vanilla.js" -ForegroundColor Green
} else {
    Write-Host "  ❌ NO usa main-vanilla.js" -ForegroundColor Red
    $errors++
}

if ($indexContent -match "jquery\.min\.js") {
    Write-Host "  ⚠️  Todavía referencia jQuery" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "  ✅ NO referencia jQuery" -ForegroundColor Green
}

if ($indexContent -match "Critical CSS") {
    Write-Host "  ✅ Tiene Critical CSS inline" -ForegroundColor Green
} else {
    Write-Host "  ❌ NO tiene Critical CSS inline" -ForegroundColor Red
    $errors++
}

if ($indexContent -match "preload.*font") {
    Write-Host "  ✅ Tiene preload de fuentes" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  NO tiene preload de fuentes" -ForegroundColor Yellow
    $warnings++
}

Write-Host ""

# Verificar contenido de es/index.html
Write-Host "🔎 Verificando es/index.html..." -ForegroundColor Yellow
$esIndexContent = Get-Content "es/index.html" -Raw

if ($esIndexContent -match "main-vanilla\.js") {
    Write-Host "  ✅ Usa main-vanilla.js" -ForegroundColor Green
} else {
    Write-Host "  ❌ NO usa main-vanilla.js" -ForegroundColor Red
    $errors++
}

if ($esIndexContent -match "jquery\.min\.js") {
    Write-Host "  ⚠️  Todavía referencia jQuery" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "  ✅ NO referencia jQuery" -ForegroundColor Green
}

if ($esIndexContent -match "Critical CSS") {
    Write-Host "  ✅ Tiene Critical CSS inline" -ForegroundColor Green
} else {
    Write-Host "  ❌ NO tiene Critical CSS inline" -ForegroundColor Red
    $errors++
}

Write-Host ""

# Verificar Service Worker
Write-Host "🔧 Verificando Service Worker..." -ForegroundColor Yellow
$swContent = Get-Content "sw.js" -Raw

if ($swContent -match "v1\.1\.0") {
    Write-Host "  ✅ Versión actualizada a v1.1.0" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Versión NO actualizada" -ForegroundColor Yellow
    $warnings++
}

if ($swContent -match "main-vanilla\.js") {
    Write-Host "  ✅ Cachea main-vanilla.js" -ForegroundColor Green
} else {
    Write-Host "  ❌ NO cachea main-vanilla.js" -ForegroundColor Red
    $errors++
}

if ($swContent -match "jquery\.min\.js") {
    Write-Host "  ⚠️  Todavía cachea jQuery" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "  ✅ NO cachea jQuery" -ForegroundColor Green
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

# Resumen
Write-Host ""
Write-Host "📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "  Errores: $errors" -ForegroundColor $(if ($errors -eq 0) { "Green" } else { "Red" })
Write-Host "  Advertencias: $warnings" -ForegroundColor $(if ($warnings -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ ¡Optimización completada exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Cyan
    Write-Host "  1. Probar localmente: python -m http.server 8000" -ForegroundColor White
    Write-Host "  2. Verificar funcionalidad en navegador" -ForegroundColor White
    Write-Host "  3. Ejecutar Lighthouse para verificar performance" -ForegroundColor White
    Write-Host "  4. Commit y push a GitHub" -ForegroundColor White
} elseif ($errors -eq 0) {
    Write-Host "⚠️  Optimización completada con advertencias" -ForegroundColor Yellow
    Write-Host "Revisa las advertencias arriba y considera corregirlas." -ForegroundColor Yellow
} else {
    Write-Host "❌ Optimización incompleta - hay errores" -ForegroundColor Red
    Write-Host "Revisa los errores arriba y corrígelos antes de continuar." -ForegroundColor Red
}

Write-Host ""
