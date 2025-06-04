# Café de la Loma - Sitio Web

![Café de la Loma](screenshots/preview.jpg)

Este repositorio contiene el código fuente para el sitio web oficial de "Café de la Loma", una cafetería artesanal que muestra sus productos, ubicación y horarios de manera atractiva.

## 📋 Características

- Diseño completamente responsivo (escritorio, tablet y móvil)
- Secciones interactivas con animaciones y transiciones
- Modo oscuro/claro con persistencia
- Galería interactiva con lightbox
- Formulario de reservas con validación
- Integración con Google Maps API
- Menú categorizado con tabs
- Menú de navegación hamburguesa en móvil
- Animación de carga al inicio

## 🚀 Tecnologías utilizadas

- HTML5 semántico
- CSS3 (variables, flexbox, grid, media queries)
- JavaScript vanilla
- Google Maps API
- Font Awesome (iconos)
- Google Fonts

## 📱 Diseño Responsivo

El sitio está optimizado para los siguientes breakpoints:

- 📱 Móvil: 375px
- 📱 Tablet: 768px
- 🖥️ Escritorio: 1200px+

## 🎨 Guía de Estilos

### Colores

| Variable | Valor (Light) | Valor (Dark) | Uso |
|----------|---------------|--------------|-----|
| `--primary-color` | `#6b4226` | `#8b5e3c` | Color principal, botones |
| `--secondary-color` | `#a67c52` | `#c89b70` | Elementos secundarios |
| `--accent-color` | `#d4a373` | `#e6be8a` | Acentos, destacados |
| `--bg-color` | `#ffffff` | `#121212` | Fondo principal |
| `--text-color` | `#333333` | `#f5f5f5` | Texto principal |
| `--light-bg` | `#f8f9fa` | `#1e1e1e` | Secciones alternativas |
| `--footer-bg` | `#2c1810` | `#0a0a0a` | Fondo del footer |

### Tipografía

- **Títulos**: Playfair Display (serif)
- **Cuerpo**: Poppins (sans-serif)

## 📁 Estructura de archivos

```
/
├── index.html          # Archivo HTML principal
├── styles.css         # Estilos CSS
├── scripts.js         # JavaScript del sitio
├── assets/            # Imágenes y recursos
│   ├── favicon.ico
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── about-us.jpg
│   └── ... (otras imágenes)
└── screenshots/       # Capturas de pantalla para el README
```

## ⚙️ Instalación y Uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/cafe-de-la-loma.git
   ```

2. Abre el archivo `index.html` en tu navegador para ver el sitio localmente.

3. Para habilitar la funcionalidad completa del mapa, reemplaza `YOUR_API_KEY` en el archivo `index.html` con tu propia API key de Google Maps:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
   ```

## 📦 Despliegue

Este sitio puede ser desplegado en cualquier servidor web estático como:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 🧩 Componentes Principales

### Selector de Tema

El sitio incluye un selector de tema claro/oscuro que almacena la preferencia del usuario en localStorage.

### Menú de Navegación

En pantallas móviles, el menú se convierte en un menú hamburguesa que se expande al hacer clic.

### Formulario de Reservas

Incluye validación completa de:
- Nombre
- Correo electrónico
- Teléfono
- Fecha (no permite fechas pasadas)
- Número de personas

### Galería con Lightbox

Permite ver las imágenes en tamaño completo y navegar entre ellas con controles o teclado (flechas izquierda/derecha).

## 📝 Notas para desarrolladores

- El código CSS está organizado por secciones para facilitar el mantenimiento
- Se utilizan variables CSS para mantener consistencia en colores y tipografía
- El JavaScript está comentado por secciones funcionales
- Para añadir nuevos productos al menú, solo es necesario seguir la estructura HTML existente

## 📸 Capturas de pantalla

### Escritorio
![Vista de escritorio](screenshots/desktop.jpg)

### Tablet
![Vista de tablet](screenshots/tablet.jpg)

### Móvil
![Vista de móvil](screenshots/mobile.jpg)

## 👥 Créditos

Diseñado y desarrollado por un desarrollador apasionado como parte de un proyecto para mostrar habilidades de desarrollo web avanzado.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.