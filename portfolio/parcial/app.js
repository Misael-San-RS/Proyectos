const form = document.getElementById("notification-form");
const statusDiv = document.getElementById("status");

// IDs de EmailJS
const SERVICE_ID = "service_cmggyb3";
const TEMPLATE_ID = "template_nz6i5q9";

// Función para validar correo
function validarCorreo(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener valores
  const nombre = form.from_name.value.trim();
  const correo = form.from_email.value.trim();
  const mensaje = form.message.value.trim();

  // Validaciones
  if (nombre === "") {
    statusDiv.textContent = "Por favor ingresa tu nombre.";
    statusDiv.className = "status error";
    return;
  }

  if (!validarCorreo(correo)) {
    statusDiv.textContent = "Ingresa un correo electrónico válido.";
    statusDiv.className = "status error";
    return;
  }

  if (mensaje === "") {
    statusDiv.textContent = "El mensaje no puede estar vacío.";
    statusDiv.className = "status error";
    return;
  }

  // Si todo está correcto
  statusDiv.textContent = "Enviando mensaje...";
  statusDiv.className = "status";

  const formData = {
    from_name: nombre,
    from_email: correo,
    message: mensaje,
  };

  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, formData)
    .then(() => {
      statusDiv.textContent = "Mensaje enviado correctamente. Revisa tu bandeja de correo.";
      statusDiv.className = "status success";
      form.reset();
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      statusDiv.textContent = "Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.";
      statusDiv.className = "status error";
    });
});

