const mongoose = require("mongoose");

//Conectandonos a la base de datos de MongoDB proporcionando el string de conexion que esta en el archivo .env
mongoose.connect(process.env.MONGO_URL, {
    dbName: "ChatMERNDatabase",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Mongoose.connection es entonces el objeto que representa la conexion que establecimos anteriormente con mongoose.connect(), este objeto nos permite hacer operaciones relacionadas a la conexion, como los eventos que vemos más abajo (on y error, aunque tambien existen otros como open), configurar opciones, etc.
const db = mongoose.connection;

//En caso de que se de el evento "connected" se imprimira en la consola el siguiente string
db.on("connected", () => {
    console.log("¡La conexion a MongoDB ha sido exitosa!");
});

db.on("error", (err) => {
    console.log("No se pudo conectar a MongoDB: " + err);
});

module.exports = db;
