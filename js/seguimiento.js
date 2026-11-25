/* =====================================================================
   SoporTEC - Seguimiento de reparaciones con AJAX + JSON (js/seguimiento.js)
   Requisitos 9 (AJAX + JSON) y 7 (validación con expresión regular).

   Aquí usamos $.ajax() de jQuery (en servicios.js usamos fetch();
   ambos hacen lo mismo: pedir datos sin recargar la página).

   Flujo:
     1. La persona escribe su código (ej.: ST-1001) y pulsa Consultar.
     2. Validamos el formato con una regex.
     3. $.ajax() lee data/reparaciones.json.
     4. Buscamos el código en la lista y dibujamos el resultado.

   Nota: los datos son de ejemplo. En un sistema real, el JSON vendría
   de una base de datos que el taller va actualizando.
   ===================================================================== */

// Nombres de las 5 etapas del servicio técnico, en orden
var ETAPAS = ["Diagnóstico", "Cotización", "Espera de repuestos", "Reparación", "Entrega"];

// Regex del código: las letras ST, un guion y exactamente 4 dígitos
var regexCodigo = /^ST-\d{4}$/;

$(document).ready(function () {

  var $formulario = $("#formSeguimiento");
  var $campo = $("#codigo");
  var $error = $("#error-codigo");
  var $resultado = $("#resultado");

  // Si la página no tiene este formulario, no hacemos nada
  if ($formulario.length === 0) {
    return;
  }

  // Dibuja el resultado de una reparación (HTML armado con texto)
  function dibujarResultado(r) {
    var estado = r.finalizado ? "Entregado" : ETAPAS[r.etapaActual - 1];
    var html = "";

    html += '<div class="reparacion">';
    html += '<div class="reparacion__cabecera">';
    html += '<h2>' + r.codigo + '</h2>';
    html += '<span class="estado' + (r.finalizado ? ' estado--listo' : '') + '">' + estado + '</span>';
    html += '</div>';
    html += '<p><strong>Equipo:</strong> ' + r.equipo + '</p>';
    html += '<p><strong>Falla reportada:</strong> ' + r.falla + '</p>';
    html += '<p><strong>Ingreso:</strong> ' + r.ingreso + ' &nbsp;|&nbsp; <strong>Cliente:</strong> ' + r.cliente + '</p>';

    // Línea de tiempo: recorremos las 5 etapas con un bucle for
    html += '<h3>Etapas del servicio</h3><ol class="etapas">';
    for (var i = 0; i < ETAPAS.length; i++) {
      var clase;
      if (r.finalizado || i < r.etapaActual - 1) {
        clase = "hecha";        // Etapa terminada
      } else if (i === r.etapaActual - 1) {
        clase = "actual";       // Etapa en curso
      } else {
        clase = "pendiente";    // Etapa que falta
      }

      html += '<li class="' + clase + '"><strong>' + ETAPAS[i] + '</strong>';
      if (r.etapas[i]) {        // Si ya hay información de esta etapa, la mostramos
        html += '<span>' + r.etapas[i].fecha + ' — ' + r.etapas[i].nota + '</span>';
      } else {
        html += '<span>Aún no inicia.</span>';
      }
      html += '</li>';
    }
    html += '</ol>';

    // Evidencias del diagnóstico
    html += '<h3>Evidencias del diagnóstico</h3><ul class="evidencias">';
    for (var j = 0; j < r.evidencias.length; j++) {
      html += '<li>' + r.evidencias[j] + '</li>';
    }
    html += '</ul></div>';

    // Mostramos el resultado con un efecto jQuery (primero oculto, luego slideDown)
    $resultado.hide().html(html).slideDown(350);
  }

  // Evento "submit": se ejecuta al pulsar Consultar
  $formulario.on("submit", function (evento) {
    evento.preventDefault();

    var codigo = $campo.val().trim().toUpperCase(); // Convertimos a mayúsculas
    $resultado.slideUp(150);                         // Ocultamos el resultado anterior

    // 1) Validación del formato con regex
    if (codigo === "") {
      $error.text("Escribe tu código de seguimiento.");
      $campo.addClass("invalido");
      return;
    }
    if (!regexCodigo.test(codigo)) {
      $error.text("El código tiene el formato ST-1234 (ST, guion y 4 números).");
      $campo.addClass("invalido");
      return;
    }
    $error.text("");
    $campo.removeClass("invalido");

    // 2) Petición AJAX al archivo JSON
    $.ajax({
      url: "data/reparaciones.json",
      dataType: "json"
    })
      .done(function (lista) {
        // Buscamos en la lista el elemento cuyo código coincide
        var encontrada = null;
        for (var i = 0; i < lista.length; i++) {
          if (lista[i].codigo === codigo) {
            encontrada = lista[i];
          }
        }

        if (encontrada) {
          dibujarResultado(encontrada);
        } else {
          // .text() inserta el texto sin interpretarlo como HTML (más seguro)
          $resultado.hide().html('<p class="estado-carga estado-carga--error"></p>');
          $resultado.find("p").text("No encontramos el código " + codigo + ". Revisa que esté bien escrito.");
          $resultado.slideDown(250);
        }
      })
      .fail(function () {
        var ayuda = "";
        if (window.location.protocol === "file:") {
          ayuda = " Abre el sitio con un servidor local (Live Server de VS Code) o desde el sitio publicado.";
        }
        $resultado.hide().html('<p class="estado-carga estado-carga--error"></p>');
        $resultado.find("p").text("No pudimos consultar los datos." + ayuda);
        $resultado.slideDown(250);
      });
  });

});
