import { createClient } from "@libsql/client";

//*Configurar la conexion a Turso

const db = createClient({
  url: "libsql://contacto-joberland.aws-us-west-2.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDM4ODEzMzgsImlkIjoiMzRhMTgxNzctOWY5MC00MmY4LTkzMjctMzIwMzFkNDMwNDY2IiwicmlkIjoiYzc5ZjUzMzAtYTQ4Ni00ZDVhLWI2OWQtOTI3NzZmYWYzOGE5In0.0kQuyOIp7pCMoE2o8jf-vRA2Qp1F5xI8l6Bf7lO0w4zjm1_l1qaBp4-fxlDuwkyXX6WliJ4v920jB_pYVwXwCA",
});

//*crear la tabla de propiedades

async function crearTabla() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS cuentas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20) NOT NULL,
      lastname VARCHAR(20) NOT NULL,
      phone VARCHAR(11) NOT NULL
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      )
      `);
    console.log("Tabla de propiedades creada.");
  } catch (err) {
    console.log("Error al crear la tabla:", err.message);
  }
}

module.exports = { db, crearTabla };
