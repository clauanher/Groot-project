const User = require('../models/users.model')
const Star = require('../models/stars.model')
const Constellation = require('../models/constellations.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Función para que nuevos usuarios puedan crearse una cuenta
const signup = async (req, res) => {
    try {
        // Generamos el salto, el string aleatorio que se utilizará para encriptar la contraseña
    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALTS))
        // Encriptamos la contraseña que nos llega por el body de la petición, y la sobreescribimos para luego crear al usuario con la contraseña ya encriptada
        req.body.password = bcrypt.hashSync(req.body.password, salt)
    const user = await User.create(req.body)

     // Generamos un token para devolver al cliente, así el usuario ya será capaz de realizar peticiones que reguieran estar logueado
     // {email: user.email} es la información que pasaremos como 'payload'. Cuando desencriptemos el token en el middleware de 'checkAuth', podremos acceder a la info que hayamos definido en este payload.
     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({
            message: "Signup succesful",
            result: token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error signing up",
            result: error,
        });
    }
}

// Función para que un usuario ya registrado pueda loguearse. Deberá pasarnos su email y contraseña
const login = async (req, res) => {
    try {
        // Primero comprobamos que tengamos un usuario en la base de datos con el email facilitado
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            return res.status(401).json({
                message: "Email or password incorrect",
                result: 0,
            });
        }

        // Si hemos llegado hasta aquí, es que hay un usuario en la base de datos con el email facilitado. Ahora falta comprobar la validez de la contraseña.

        // función que nos compara la contraseña facilitada en el momento del logueo con la contraseña encriptada guardada en la base de datos. Encriptará la contraseña facilitada y comparará su resultado con la de la base de datos.
        const result = bcrypt.compareSync(req.body.password, user.password)
        // Si result es false, significa que las contraseñas enciptadas no coinciden, por lo tanto la contraseña facilitada es erróena
        if (!result) {
            return res.status(401).json({
                message: "Email or password incorrect",
                result: 0,
            });
        }

        // Si ha ido todo bien, generamos un token y lo devolvemos al usuario
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        res.status(200).json({
            message: "login succesful",
            result: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error signing up",
            result: error,
        });
    }
}

module.exports = {
    signup,
    login
}