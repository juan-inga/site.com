SoporTEC - Soporte técnico de laptops y PCs (Comas, Lima, Perú)
Proyecto Final de Diseño Web 2026-II - Universidad de Ciencias y Humanidades

URL del sitio publicado: (pegar aquí la URL de Netlify / GitHub Pages)

DESCRIPCIÓN
Sitio web dinámico y responsivo para un servicio técnico de computadoras.
Permite ver servicios y tarifas, consultar en línea el estado de una reparación
(diagnóstico, cotización, espera de repuestos, reparación y entrega) y
solicitar una cotización con un formulario validado.

INTEGRANTES
- Sthiven Piero León Porras (26101013)
- Juan Carlos Inga (26101030)
- Josue Reyes (26101040)

ESTRUCTURA
index.html, servicios.html, seguimiento.html, nosotros.html, contacto.html
css/styles.css                 Estilos globales, responsivo y animaciones
js/main.js                     jQuery: slider, menú móvil, slideToggle
js/dom.js                      Manipulación del DOM
js/formulario.js               Validación del formulario con regex
js/servicios.js                AJAX con fetch() + data/servicios.json
js/seguimiento.js              AJAX con $.ajax() + data/reparaciones.json
data/                          Archivos JSON
img/                           Imágenes (favicon, fondo, banner-inicio.jpg y 3 imágenes de apoyo:
                               por-que-soportec.jpg, servicios-encabezado.jpg, seguimiento-diagnostico.jpg;
                               se pueden reemplazar por fotos con el mismo nombre)

CÓMO PROBARLO
Los archivos JSON no cargan si se abre el HTML con doble clic. Usar la extensión
Live Server de VS Code, o abrir el sitio ya publicado.
Códigos de ejemplo para el seguimiento: ST-1001, ST-1002, ST-1003.
