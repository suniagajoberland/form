const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById, createContact, updateContact, deleteContact, findContactByPhone } = require('../data/contacts');

// Crear un contacto (POST)
router.post('/', createContact);

// Leer todos los contactos (GET)
router.get('/', getAllContacts);

// Leer un contacto por ID (GET)
router.get('/:id', getContactById);

// Actualizar un contacto por ID (PUT)
router.put('/:id', updateContact);

// Eliminar un contacto por ID (DELETE)
router.delete('/:id', deleteContact);

// Buscar un contacto por número de teléfono (GET)
router.get('/telefono/:telefono', findContactByPhone);

module.exports = router;
