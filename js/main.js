/* =====================================================================
   SoporTEC - Efectos con jQuery (js/main.js)
   Requisito 6: slider de imágenes/banner + al menos 2 efectos jQuery.

   Efectos que se usan aquí:
     - fadeOut() / fadeIn()  -> cambian los slides del banner (inicio)
     - slideToggle()         -> abre/cierra el menú móvil y el detalle
                                de cada servicio (servicios)

   Nota: jQuery se escribe con el símbolo $.  La forma general es:
       $("selector").efecto();
   donde "selector" es el mismo que usarías en CSS (.clase, #id, etiqueta).
   ===================================================================== */

/* $(document).ready(...) espera a que todo el HTML esté cargado
   antes de ejecutar el código. Así los elementos ya existen. */
$(document).ready(function () {

  /* -------------------------------------------------------------------
     1. MENÚ MÓVIL (slideToggle)
     Al pulsar el botón ☰, el menú se despliega o se pliega con una
     animación de deslizamiento.
     ------------------------------------------------------------------- */
  $("#menuBoton").on("click", function () {
    $("#menuNav").slideToggle(250); // 250 = duración en milisegundos

    // Accesibilidad: avisamos a lectores de pantalla si está abierto o cerrado
    var abierto = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !abierto);
  });

  /* Si la ventana se agranda (PC), el menú debe verse siempre.
     slideToggle deja un estilo "display:none" en línea; aquí lo quitamos. */
  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      $("#menuNav").removeAttr("style");
    }
  });

  /* -------------------------------------------------------------------
     2. SLIDER DEL BANNER (fadeOut + fadeIn)
     Solo existe en index.html, por eso primero revisamos que haya slides.
     ------------------------------------------------------------------- */
  var $slides = $(".slide");   // Lista de todos los slides
  var $puntos = $(".punto");   // Lista de los puntos de navegación

  if ($slides.length > 0) {
    var actual = 0;            // Posición del slide que se está mostrando
    var animando = false;      // Evita cambios mientras otro cambio está en curso
    var temporizador;          // Guarda el cambio automático

    // Al inicio mostramos solo el primer slide
    $slides.eq(0).show();      // .eq(0) = el elemento número 0 de la lista

    // Función que cambia al slide número "nuevo"
    function mostrarSlide(nuevo) {
      if (animando || nuevo === actual) {
        return; // Si ya está cambiando o es el mismo slide, no hacemos nada
      }
      animando = true;

      // 1) El slide actual se desvanece (fadeOut)...
      $slides.eq(actual).fadeOut(400, function () {
        // 2) ...y cuando termina, aparece el nuevo (fadeIn)
        $slides.eq(nuevo).fadeIn(400, function () {
          animando = false;
        });
      });

      // Actualizamos cuál punto está marcado
      $puntos.removeClass("activo").attr("aria-current", "false");
      $puntos.eq(nuevo).addClass("activo").attr("aria-current", "true");

      actual = nuevo;
    }

    // Pasa al siguiente slide; al llegar al último, vuelve al primero
    function siguiente() {
      mostrarSlide((actual + 1) % $slides.length);
    }

    // Cambio automático cada 5 segundos
    function iniciarAutomatico() {
      temporizador = setInterval(siguiente, 5000);
    }

    // Clic en un punto: va a ese slide y reinicia el cambio automático
    $puntos.on("click", function () {
      var indice = $(this).index(); // Posición del punto pulsado (0, 1, 2)
      clearInterval(temporizador);
      mostrarSlide(indice);
      iniciarAutomatico();
    });

    iniciarAutomatico();
  }

  /* -------------------------------------------------------------------
     3. DETALLE DE SERVICIOS (slideToggle)
     En servicios.html, el botón "Ver detalle" despliega la descripción.
     ------------------------------------------------------------------- */
  // Usamos $(document).on("click", ".boton-detalle", ...) porque las tarjetas
  // se crean DESPUÉS de cargar la página (las trae js/servicios.js con AJAX).
  $(document).on("click", ".boton-detalle", function () {
    // $(this) es el botón que se pulsó.
    // .closest(".servicio") sube hasta la tarjeta del servicio
    // y .find(".servicio__detalle") busca el detalle dentro de ella.
    var $detalle = $(this).closest(".servicio").find(".servicio__detalle");

    $detalle.slideToggle(300);

    // Cambiamos el texto del botón según el estado
    var abierto = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !abierto);
    $(this).text(abierto ? "Ver detalle" : "Ocultar detalle");
  });

});
