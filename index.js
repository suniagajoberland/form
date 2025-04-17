const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
const port = 3000;

app.use(express.json());

// Usa las rutas de contactos
app.use('/contacts', contactsRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
