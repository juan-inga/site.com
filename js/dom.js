/* =====================================================================
   SoporTEC - Manipulación del DOM (js/dom.js)
   Requisito 8: manipular al menos 2 elementos de la página con
   getElementById, querySelector, innerHTML o similar.

   DOM = "Document Object Model": la página HTML convertida en objetos
   que JavaScript puede buscar y modificar. Aquí hacemos 3 cambios:
     1. El año del pie de página se actualiza solo.
     2. El saludo del inicio cambia según la hora.
     3. El contador de caracteres del formulario de contacto.
   Este archivo se carga en todas las páginas, por eso cada bloque
   primero revisa que el elemento exista (if (elemento) ...).
   ===================================================================== */

/* ---------- 1. Año actual en el pie (getElementById + textContent) ---------- */
var elementoAnio = document.getElementById("anio");
if (elementoAnio) {
  elementoAnio.textContent = new Date().getFullYear();
}

/* ---------- 2. Saludo según la hora (getElementById + innerHTML) ---------- */
var elementoSaludo = document.getElementById("saludo");
if (elementoSaludo) {
  var hora = new Date().getHours(); // Número de 0 a 23
  var saludo;

  if (hora < 12) {
    saludo = "Buenos días";
  } else if (hora < 19) {
    saludo = "Buenas tardes";
  } else {
    saludo = "Buenas noches";
  }

  // innerHTML reemplaza el contenido del elemento (permite usar etiquetas HTML)
  elementoSaludo.innerHTML = saludo + ", bienvenido a Sopor<span class=\"verde\">TEC</span>";
}

/* ---------- 3. Contador de caracteres (querySelector + eventos) ---------- */
// querySelector usa selectores CSS: "#id", ".clase" o "etiqueta"
var cajaFalla = document.querySelector("#falla");
var contador = document.querySelector("#contadorFalla");

if (cajaFalla && contador) {
  // El evento "input" ocurre cada vez que la persona escribe o borra
  cajaFalla.addEventListener("input", function () {
    contador.textContent = cajaFalla.value.length + " / 300 caracteres";
  });
}
