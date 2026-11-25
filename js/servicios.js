/* =====================================================================
   SoporTEC - Catálogo de servicios con AJAX + JSON (js/servicios.js)
   Requisito 9: carga dinámica de datos desde un archivo .json local
   usando fetch(), y mostrar los resultados en la página.

   AJAX = pedir datos al servidor SIN recargar la página.
   JSON = formato de texto para guardar datos (data/servicios.json).

   Flujo:
     1. fetch("data/servicios.json") pide el archivo.
     2. .then(...) convierte la respuesta en objetos de JavaScript.
     3. Recorremos la lista y dibujamos una tarjeta por cada servicio.
     4. .catch(...) muestra un aviso si algo falla.
   ===================================================================== */

var contenedorCatalogo = document.getElementById("catalogo");

if (contenedorCatalogo) {

  // Crea el HTML de una tarjeta de servicio
  function crearTarjeta(servicio) {
    return (
      '<article class="servicio">' +
        '<div class="servicio__cabecera">' +
          '<h3 class="servicio__nombre">' + servicio.nombre + '</h3>' +
          '<span class="precio">S/ ' + servicio.precio + '</span>' +
        '</div>' +
        '<button class="boton-detalle" type="button" aria-expanded="false">Ver detalle</button>' +
        '<div class="servicio__detalle"><p>' + servicio.detalle + '</p></div>' +
      '</article>'
    );
  }

  fetch("data/servicios.json")
    .then(function (respuesta) {
      // respuesta.ok es false si el archivo no se encontró (error 404, etc.)
      if (!respuesta.ok) {
        throw new Error("No se pudo leer el archivo JSON");
      }
      return respuesta.json(); // Convierte el texto JSON en una lista de objetos
    })
    .then(function (servicios) {
      var html = "";
      // forEach recorre cada servicio de la lista
      servicios.forEach(function (servicio) {
        html += crearTarjeta(servicio);
      });
      contenedorCatalogo.innerHTML = html; // Mostramos todas las tarjetas
    })
    .catch(function () {
      // Si el HTML ya trae las tarjetas escritas, las dejamos tal cual:
      // así el catálogo se ve aunque fetch falle (por ejemplo, al abrir con doble clic).
      if (contenedorCatalogo.querySelector(".servicio")) {
        return;
      }
      var ayuda = "";
      // Si la página se abrió con doble clic (file://), el navegador bloquea fetch
      if (window.location.protocol === "file:") {
        ayuda = " Abre el sitio con un servidor local (por ejemplo, la extensión Live Server de VS Code) o desde el sitio publicado.";
      }
      contenedorCatalogo.innerHTML =
        '<p class="estado-carga estado-carga--error">No pudimos cargar el catálogo.' + ayuda + '</p>';
    });
}
