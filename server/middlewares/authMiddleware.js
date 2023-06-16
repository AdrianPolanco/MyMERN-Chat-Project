const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //console.log(req.headers.authorization);
    try {
        //Partiendo o dividiendo la key que contiene el token entre antes y despues del espacio, ya que ahí esta el texto "Bearer + Token", al dividirlo en un array, saldran dos elementos, y el token sera el segundo (osea, el indice 1)
        const token = req.headers.authorization.split(" ")[1];

        //Descodificando el token con verify(token, llaveToken)
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        //La key userId del req.body sera igual al userId que hay en el token descodificado
        req.body.userId = decoded.userId;
        //Pasando al siguiente middleware una vez finalizada la descodificación del token exitosamente
        next();
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
};
