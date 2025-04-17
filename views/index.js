document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const contactoInput = document.getElementById("contacto");

  // Escuchar el evento "submit" para manejar los datos del formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const contact = {
      name: nombreInput.value.trim(),
      lastName: apellidoInput.value.trim(),
      phone: contactoInput.value.trim(),
    };

    // Obtener la lista de contactos desde localStorage
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Verificar si el número de contacto ya está registrado
    const existingContact = contacts.find((c) => c.phone === contact.phone);

    if (existingContact) {
      alert(
        "El número de contacto ya está registrado. Por favor, ingrese un número diferente."
      );
      return;
    }

    // Agregar el nuevo contacto a la lista
    contacts.push(contact);

    // Guardar la lista de contactos actualizada en localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    alert("Contacto guardado correctamente");

    // Limpiar los campos del formulario
    nombreInput.value = "";
    apellidoInput.value = "";
    contactoInput.value = "";
  });
});
