// Simulando base de datos en memoria
let contacts = [];

// Crear un contacto
function createContact(req, res) {
  const { nombre, apellido, telefono } = req.body;
  const id = contacts.length + 1;
  const newContact = { id, nombre, apellido, telefono };
  contacts.push(newContact);
  console.log("Contacto creado:", newContact); // Registro para verificar el contenido
  res.status(201).send({ mensaje: "Contacto creado", data: newContact });
}

// Leer todos los contactos
function getAllContacts(req, res) {
  res.status(200).send(contacts);
}

// Leer un contacto por ID
function getContactById(req, res) {
  const id = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).send({ mensaje: "Contacto no encontrado" });
  }
  res.status(200).send(contact);
}

// Actualizar un contacto por ID
function updateContact(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, apellido, telefono } = req.body;
  const contactIndex = contacts.findIndex((c) => c.id === id);
  if (contactIndex === -1) {
    return res.status(404).send({ mensaje: "Contacto no encontrado" });
  }
  contacts[contactIndex] = { id, nombre, apellido, telefono };
  res
    .status(200)
    .send({ mensaje: "Contacto actualizado", data: contacts[contactIndex] });
}

// Eliminar un contacto por ID
function deleteContact(req, res) {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex((c) => c.id === id);
  if (contactIndex === -1) {
    return res.status(404).send({ mensaje: "Contacto no encontrado" });
  }
  const deletedContact = contacts.splice(contactIndex, 1);
  res
    .status(200)
    .send({ mensaje: "Contacto eliminado", data: deletedContact[0] });
}

// Buscar un contacto por número de teléfono
function findContactByPhone(req, res) {
  const telefono = req.params.telefono;
  const contact = contacts.find((c) => c.telefono === telefono);
  if (!contact) {
    return res.status(404).send({ mensaje: "Contacto no encontrado" });
  }
  res.status(200).send(contact);
}

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  findContactByPhone,
};
