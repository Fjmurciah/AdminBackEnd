const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'No se encuentra el token en la petición'
        })
    }

    try {
        const { email } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no existente en la base de datos'
            })
        }

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validateJWT
}