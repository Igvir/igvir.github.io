# Guía Completa: Conversión de Imágenes a WebP

**Objetivo**: Reducir el tamaño de las imágenes en 25-35% para mejorar el rendimiento  
**Tiempo estimado**: 30-45 minutos  
**Dificultad**: Fácil

---

## 📋 Requisitos Previos

### 1. Instalar ImageMagick

**Opción A - Usando winget (Recomendado)**:
```powershell
winget install ImageMagick.ImageMagick
```

**Opción B - Usando Chocolatey**:
```powershell
choco install imagemagick
```

**Opción C - Descarga Manual**:
1. Visita: https://imagemagick.org/script/download.php
2. Descarga: ImageMagick-7.x.x-Q16-HDRI-x64-dll.exe
3. Instala con opciones por defecto
4. Reinicia PowerShell

### 2. Verificar Instalación

```powershell
magick --version
```

Deberías ver algo como:
```
Version: ImageMagick 7.1.x-x Q16-HDRI x64
```

---

## 🖼️ Imágenes a Convertir

Tu sitio tiene **14 imágenes** que se beneficiarán de la conversión:

### Imágenes Críticas (Alta Prioridad)
1. `avatar.jpg` - Foto de perfil (aparece en todas las páginas)
2. `banner5-white-small.png` - Banner principal
3. `perfil-24.jpg` - Foto de perfil alternativa

### Certificaciones (Media Prioridad)
4. `aws-sysops-admin-2024.png`
5. `aws-cda-2023.png`
6. `aws-sap-2022.png`
7. `aws-sa-2020.png`
8. `aws-cp-2020.png`
9. `togaf9.png`
10. `gbm-powers-2020.png`

### Imágenes Adicionales (Baja Prioridad)
11. `banner.jpg`
12. `pic01.jpg`
13. `pic02.jpg`
14. `pic03.jpg`

**Tamaño Total Estimado**: ~450KB  
**Después de WebP**: ~300KB  
**Ahorro**: ~150KB (33%)

---

## 🚀 Paso 1: Conversión de Imágenes

### Ejecutar el Script

```powershell
# Navega a la carpeta del proyecto
cd C:\Users\IRAMIREZ\code\igvir.github.io

# Ejecuta el script de conversión
.\convert-to-webp.ps1
```

### ¿Qué hace el script?

1. Verifica que ImageMagick esté instalado
2. Convierte cada imagen a formato WebP
3. Usa calidad 85 (balance entre tamaño y calidad)
4. Muestra el ahorro de espacio
5. Mantiene las imágenes originales como respaldo

### Salida Esperada

```
Image to WebP Conversion Script
================================

Converting images to WebP format...

Converting: images/avatar.jpg -> images/avatar.webp
  Original: 45.23 KB
  WebP: 32.15 KB
  Savings: 28.9%

Converting: images/banner5-white-small.png -> images/banner5-white-small.webp
  Original: 78.45 KB
  WebP: 52.30 KB
  Savings: 33.3%

...

Conversion complete!
```

---

## 📝 Paso 2: Actualizar HTML

Ahora necesitas actualizar el HTML para usar las imágenes WebP con fallback.

### 2.1 Actualizar index.html

**Buscar y reemplazar** estas imágenes:

#### Avatar (Línea ~128)
**Antes**:
```html
<img src="images/avatar.jpg" alt="Igvir Ramirez - Cloud Solutions Architect profile photo" />
```

**Después**:
```html
<picture>
  <source srcset="images/avatar.webp" type="image/webp">
  <img src="images/avatar.jpg" alt="Igvir Ramirez - Cloud Solutions Architect profile photo" />
</picture>
```

#### Banner (Línea ~169)
**Antes**:
```html
<img src="images/banner5-white-small.png" alt="Professional workspace with white desk" loading="lazy" />
```

**Después**:
```html
<picture>
  <source srcset="images/banner5-white-small.webp" type="image/webp">
  <img src="images/banner5-white-small.png" alt="Professional workspace with white desk" loading="lazy" />
</picture>
```

#### Certificaciones (Líneas ~222-281)
**Antes**:
```html
<img src="images/aws-sysops-admin-2024.png" alt="..." loading="lazy" />
```

**Después**:
```html
<picture>
  <source srcset="images/aws-sysops-admin-2024.webp" type="image/webp">
  <img src="images/aws-sysops-admin-2024.png" alt="..." loading="lazy" />
</picture>
```

**Repetir para todas las certificaciones**:
- aws-cda-2023.png
- aws-sap-2022.png
- aws-sa-2020.png
- aws-cp-2020.png
- togaf9.png
- gbm-powers-2020.png

### 2.2 Actualizar es/index.html

Hacer los mismos cambios en la versión española:
- Avatar (línea ~128)
- Banner (línea ~169)
- Todas las certificaciones (líneas ~222-281)

---

## 🔧 Paso 3: Actualizar Service Worker

El Service Worker necesita saber sobre las imágenes WebP.

**Archivo**: `sw.js`

**Buscar** (línea ~20):
```javascript
'/images/avatar.jpg',
'/images/banner5-white-small.png',
```

**Agregar después**:
```javascript
'/images/avatar.webp',
'/images/banner5-white-small.webp',
'/images/aws-sysops-admin-2024.webp',
'/images/aws-cda-2023.webp',
'/images/aws-sap-2022.webp',
'/images/aws-sa-2020.webp',
'/images/aws-cp-2020.webp',
'/images/togaf9.webp',
'/images/gbm-powers-2020.webp',
```

**Importante**: Incrementar la versión del cache:
```javascript
const CACHE_VERSION = 'v1.0.1'; // Cambiar de v1.0.0 a v1.0.1
```

---

## ✅ Paso 4: Probar Localmente

### 4.1 Iniciar Servidor Local

```powershell
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js (si tienes http-server)
npx http-server -p 8000
```

### 4.2 Abrir en Navegador

```
http://localhost:8000
```

### 4.3 Verificar en DevTools

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Recarga la página (Ctrl+Shift+R)
4. Busca las imágenes
5. Verifica que se carguen las versiones `.webp`

**En Chrome/Edge**: Deberías ver `avatar.webp`  
**En navegadores antiguos**: Deberías ver `avatar.jpg` (fallback)

### 4.4 Verificar Tamaños

En la pestaña Network, verifica:
- `avatar.webp` debería ser ~30% más pequeño que `avatar.jpg`
- `banner5-white-small.webp` debería ser ~30% más pequeño

---

## 🧪 Paso 5: Probar en Múltiples Navegadores

### Navegadores Modernos (Deberían usar WebP)
- ✅ Chrome
- ✅ Edge
- ✅ Firefox
- ✅ Safari 14+

### Navegadores Antiguos (Deberían usar fallback)
- ⚠️ Safari 13 o anterior
- ⚠️ Internet Explorer 11

### Cómo Probar

1. Abre DevTools
2. Ve a Network
3. Filtra por "img"
4. Recarga la página
5. Verifica qué formato se carga

---

## 📊 Paso 6: Medir el Impacto

### Antes de WebP

```powershell
# Ver tamaño de imágenes originales
Get-ChildItem images/*.jpg,images/*.png | Measure-Object -Property Length -Sum
```

### Después de WebP

```powershell
# Ver tamaño de imágenes WebP
Get-ChildItem images/*.webp | Measure-Object -Property Length -Sum
```

### Usar Lighthouse

1. Abre DevTools (F12)
2. Ve a pestaña **Lighthouse**
3. Selecciona "Performance"
4. Click "Generate report"
5. Busca "Serve images in next-gen formats"
6. Debería mostrar mejora o estar resuelto

---

## 🚀 Paso 7: Commit y Deploy

### 7.1 Verificar Cambios

```powershell
git status
```

Deberías ver:
- Modified: `index.html`, `es/index.html`, `sw.js`
- Untracked: `images/*.webp` (14 archivos nuevos)

### 7.2 Agregar Archivos

```powershell
git add images/*.webp
git add index.html es/index.html sw.js
```

### 7.3 Commit

```powershell
git commit -m "perf: convert images to WebP format for better performance

- Convert 14 images to WebP format
- Add WebP with fallback using <picture> element
- Update Service Worker to cache WebP images
- Expected improvement: 25-35% reduction in image sizes
- Maintain original images as fallback for older browsers

Impact:
- Total image size: ~450KB -> ~300KB
- Savings: ~150KB (33%)
- Improved Largest Contentful Paint (LCP)
- Better Core Web Vitals scores"
```

### 7.4 Push

```powershell
git push origin dev
```

---

## 📈 Resultados Esperados

### Métricas de Rendimiento

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Tamaño Total de Imágenes | ~450KB | ~300KB | -33% |
| Largest Contentful Paint | ~2.5s | ~2.0s | -20% |
| Lighthouse Performance | 90 | 93+ | +3 |
| Page Load Time | ~2.0s | ~1.7s | -15% |

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: Mejora significativa
- **FID (First Input Delay)**: Sin cambios
- **CLS (Cumulative Layout Shift)**: Sin cambios

---

## 🔍 Troubleshooting

### Problema: ImageMagick no se encuentra

**Solución**:
```powershell
# Reiniciar PowerShell
# O agregar manualmente al PATH
$env:Path += ";C:\Program Files\ImageMagick-7.x.x-Q16-HDRI"
```

### Problema: Imágenes WebP no se cargan

**Verificar**:
1. ¿Los archivos .webp existen en `/images`?
2. ¿El HTML usa `<picture>` correctamente?
3. ¿El navegador soporta WebP?

**Solución**:
```html
<!-- Verificar sintaxis -->
<picture>
  <source srcset="images/avatar.webp" type="image/webp">
  <img src="images/avatar.jpg" alt="..." />
</picture>
```

### Problema: Service Worker no actualiza

**Solución**:
1. Incrementar `CACHE_VERSION` en `sw.js`
2. Hard refresh (Ctrl+Shift+R)
3. Limpiar cache del navegador

### Problema: Imágenes se ven borrosas

**Solución**:
```powershell
# Reconvertir con mayor calidad
magick convert imagen.jpg -quality 90 imagen.webp
```

---

## 📋 Checklist de Implementación

### Preparación
- [ ] ImageMagick instalado
- [ ] Script de conversión listo
- [ ] Backup de imágenes originales

### Conversión
- [ ] Ejecutar `convert-to-webp.ps1`
- [ ] Verificar que se crearon 14 archivos .webp
- [ ] Verificar tamaños y ahorros

### Actualización HTML
- [ ] Actualizar `index.html` (avatar)
- [ ] Actualizar `index.html` (banner)
- [ ] Actualizar `index.html` (7 certificaciones)
- [ ] Actualizar `es/index.html` (avatar)
- [ ] Actualizar `es/index.html` (banner)
- [ ] Actualizar `es/index.html` (7 certificaciones)

### Service Worker
- [ ] Agregar imágenes WebP a STATIC_ASSETS
- [ ] Incrementar CACHE_VERSION
- [ ] Verificar sintaxis

### Testing
- [ ] Probar en Chrome
- [ ] Probar en Firefox
- [ ] Probar en Safari
- [ ] Probar en Edge
- [ ] Verificar fallback en navegadores antiguos
- [ ] Verificar tamaños en Network tab
- [ ] Ejecutar Lighthouse

### Deployment
- [ ] Commit cambios
- [ ] Push a repositorio
- [ ] Deploy a producción
- [ ] Verificar en producción
- [ ] Monitorear métricas

---

## 🎯 Resumen

### Lo que vas a hacer:
1. ✅ Instalar ImageMagick
2. ✅ Ejecutar script de conversión
3. ✅ Actualizar HTML con `<picture>` elements
4. ✅ Actualizar Service Worker
5. ✅ Probar localmente
6. ✅ Commit y deploy

### Tiempo total: 30-45 minutos

### Beneficios:
- 📉 33% reducción en tamaño de imágenes
- ⚡ 15-20% mejora en tiempo de carga
- 📈 +3 puntos en Lighthouse
- 🎯 Mejor Core Web Vitals

---

## 📞 ¿Necesitas Ayuda?

Si encuentras problemas:
1. Revisa la sección de Troubleshooting
2. Verifica que ImageMagick esté instalado
3. Asegúrate de que la sintaxis HTML sea correcta
4. Prueba en modo incógnito

---

**¿Listo para empezar?** 🚀

Comienza con el Paso 1: Instalar ImageMagick

---

Last Updated: January 21, 2026
