const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("¡La conexion a MongoDB ha sido exitosa!");
});

db.on("error", (err) => {
    console.log("No se pudo conectar a MongoDB: " + err);
});

module.exports = db;
