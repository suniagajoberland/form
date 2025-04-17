// Esperar a que el DOM esté listo para usar
document.addEventListener("DOMContentLoaded", function () {
  // Cargar los contactos al iniciar
  loadContacts();

  // Configurar la búsqueda por teléfono
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearch);
});

// Función para manejar la búsqueda de contactos
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const contacts = getContactsFromLocalStorage();
  const filteredContacts = contacts.filter(contact =>
    contact.phone.toLowerCase().includes(searchTerm)
  );
  renderContacts(filteredContacts);
}

// Función para cargar contactos desde LocalStorage
function loadContacts() {
  const contacts = getContactsFromLocalStorage();
  renderContacts(contacts);
}

// Función para obtener contactos desde LocalStorage
function getContactsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}

// Función para renderizar la lista de contactos
function renderContacts(contacts) {
  const container = document.getElementById("contactsContainer");

  // Mostrar mensaje si no hay contactos
  if (contacts.length === 0) {
    container.innerHTML = '<div class="no-contacts">No hay contactos registrados</div>';
    return;
  }

  container.innerHTML = ""; // Limpiar el contenedor

  // Crear tarjetas dinámicamente para cada contacto
  contacts.forEach((contact, index) => {
    const contactCard = document.createElement("div");
    contactCard.className = "contact-card";
    contactCard.innerHTML = `
      <h3 class="contact-name">${contact.name} ${contact.lastName}</h3>
      <p class="contact-phone">Teléfono: ${contact.phone}</p>
      <div class="contact-actions">
        <button class="btn-edit" onclick="editContact(${index})">Editar</button>
        <button class="btn-delete" onclick="deleteContact(${index})">Eliminar</button>
        <button class="btn-whatsapp" onclick="sendWhatsApp(${index})">WhatsApp</button>
      </div>
    `;
    container.appendChild(contactCard);
  });
}

// Función para redirigir a la edición de contactos
function editContact(index) {
  const contacts = getContactsFromLocalStorage();
  const contactToEdit = contacts[index];

  // Guardar el índice del contacto en edición
  localStorage.setItem("editingIndex", index);

  // Redirigir al formulario con los datos del contacto en la URL
  window.location.href = `../views/index.html?name=${encodeURIComponent(contactToEdit.name)}&lastName=${encodeURIComponent(contactToEdit.lastName)}&phone=${encodeURIComponent(contactToEdit.phone)}`;
}

// Función para eliminar un contacto
function deleteContact(index) {
  if (confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
    const contacts = getContactsFromLocalStorage();
    contacts.splice(index, 1); // Eliminar el contacto
    localStorage.setItem("contacts", JSON.stringify(contacts)); // Guardar cambios
    loadContacts(); // Refrescar la lista de contactos
  }
}

// Función para enviar mensaje por WhatsApp
function sendWhatsApp(index) {
  const contacts = getContactsFromLocalStorage();
  const contact = contacts[index];

  const codigoPais = "+58"; // Código de país (Venezuela)
  const mensaje = `Hola ${contact.name} ${contact.lastName}, Esto es una prueba de la clase.`;
  const url = `https://wa.me/${codigoPais}${contact.phone}?text=${encodeURIComponent(mensaje)}`;

  // Abrir la URL en una nueva pestaña
  window.open(url, "_blank");
}
