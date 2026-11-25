/* =====================================================================
   SoporTEC - Validación del formulario de contacto (js/formulario.js)
   Requisito 7: formulario con validación JS (campos obligatorios,
   email y teléfono con expresiones regulares).

   Se carga solo en contacto.html.

   Idea general:
     1. Cuando la persona pulsa "Enviar", detenemos el envío normal.
     2. Revisamos cada campo con una función.
     3. Si hay errores, los mostramos debajo de cada campo.
     4. Si todo está bien, mostramos un mensaje de éxito.
   ===================================================================== */

/* ---------- EXPRESIONES REGULARES (regex) ----------
   Una regex describe un patrón de texto. Se escribe entre / /.
     ^      = el texto debe empezar así
     $      = el texto debe terminar así
     \d     = un dígito (0-9)
     {8}    = exactamente 8 veces
     +      = una o más veces
     [^\s@] = cualquier carácter que NO sea espacio ni @
   Con .test(texto) la regex responde true (cumple) o false (no cumple). */

// Nombre: solo letras (con tildes y ñ) y espacios, mínimo 3 caracteres
var regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{3,}$/;

// Correo: algo + @ + algo + . + algo   (ej.: nombre@correo.com)
var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Teléfono: 9 dígitos y el primero es 9 (celulares de Perú, ej.: 999888777)
var regexTelefono = /^9\d{8}$/;

/* ---------- ELEMENTOS DE LA PÁGINA (DOM) ----------
   getElementById busca un elemento por su id. */
var formulario = document.getElementById("formContacto");
var mensajeExito = document.getElementById("mensajeExito");

/* ---------- FUNCIONES AUXILIARES ---------- */

// Muestra un mensaje de error debajo del campo y lo pinta de rojo
function mostrarError(idCampo, mensaje) {
  document.getElementById("error-" + idCampo).textContent = mensaje;
  var campo = document.getElementById(idCampo);
  campo.classList.add("invalido");
  campo.classList.remove("valido");
  campo.setAttribute("aria-invalid", "true");
}

// Quita el error y pinta el campo de verde
function marcarValido(idCampo) {
  document.getElementById("error-" + idCampo).textContent = "";
  var campo = document.getElementById(idCampo);
  campo.classList.remove("invalido");
  campo.classList.add("valido");
  campo.setAttribute("aria-invalid", "false");
}

/* Cada función de validación devuelve true (campo correcto)
   o false (campo con error). .trim() quita espacios al inicio y al final. */

function validarNombre() {
  var valor = document.getElementById("nombre").value.trim();

  if (valor === "") {
    mostrarError("nombre", "Escribe tu nombre.");
    return false;
  }
  if (!regexNombre.test(valor)) {
    mostrarError("nombre", "Usa solo letras y escribe al menos 3.");
    return false;
  }
  marcarValido("nombre");
  return true;
}

function validarCorreo() {
  var valor = document.getElementById("correo").value.trim();

  if (valor === "") {
    mostrarError("correo", "Escribe tu correo electrónico.");
    return false;
  }
  if (!regexCorreo.test(valor)) {
    mostrarError("correo", "El correo debe tener el formato nombre@dominio.com.");
    return false;
  }
  marcarValido("correo");
  return true;
}

function validarTelefono() {
  var valor = document.getElementById("telefono").value.trim();

  if (valor === "") {
    mostrarError("telefono", "Escribe tu número de celular.");
    return false;
  }
  if (!regexTelefono.test(valor)) {
    mostrarError("telefono", "Debe tener 9 dígitos y empezar con 9 (ej.: 999888777).");
    return false;
  }
  marcarValido("telefono");
  return true;
}

function validarFalla() {
  var valor = document.getElementById("falla").value.trim();

  if (valor === "") {
    mostrarError("falla", "Cuéntanos qué falla tiene tu equipo.");
    return false;
  }
  if (valor.length < 10) {
    mostrarError("falla", "Describe la falla con al menos 10 caracteres.");
    return false;
  }
  marcarValido("falla");
  return true;
}

/* ---------- EVENTOS ----------
   addEventListener("evento", función) ejecuta la función cuando ocurre
   ese evento. Solo lo hacemos si el formulario existe en la página. */
if (formulario) {

  // Validación al salir de cada campo ("blur"), para avisar en el momento
  document.getElementById("nombre").addEventListener("blur", validarNombre);
  document.getElementById("correo").addEventListener("blur", validarCorreo);
  document.getElementById("telefono").addEventListener("blur", validarTelefono);
  document.getElementById("falla").addEventListener("blur", validarFalla);

  // Evento "submit": ocurre al pulsar el botón Enviar
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Evita que la página se recargue

    // Validamos TODOS los campos (guardamos cada resultado en una variable
    // para que se muestren todos los errores a la vez, no solo el primero)
    var nombreOk = validarNombre();
    var correoOk = validarCorreo();
    var telefonoOk = validarTelefono();
    var fallaOk = validarFalla();

    if (nombreOk && correoOk && telefonoOk && fallaOk) {
      // Todo correcto: mostramos el mensaje de éxito (manipulación del DOM)
      var nombre = document.getElementById("nombre").value.trim();
      mensajeExito.textContent =
        "¡Gracias, " + nombre + "! Recibimos tu solicitud y te responderemos pronto.";
      mensajeExito.style.display = "block";

      // Limpiamos el formulario y los colores de validación
      formulario.reset();
      var campos = formulario.querySelectorAll("input, select, textarea");
      for (var i = 0; i < campos.length; i++) {
        campos[i].classList.remove("valido", "invalido");
      }

      // NOTA: por ahora el formulario no envía los datos a ningún servidor.
      // Para recibirlos de verdad haría falta un servicio de formularios
      // (por ejemplo Formspree) o un backend.
    } else {
      mensajeExito.style.display = "none";
    }
  });
}
