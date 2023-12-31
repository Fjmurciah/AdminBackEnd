const jwt = require('jsonwebtoken');

const generateJWT = (email = '') => {

    return new Promise((resolve, reject) => {

        const payload = { email };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })

    })

}

module.exports = {
    generateJWT
}