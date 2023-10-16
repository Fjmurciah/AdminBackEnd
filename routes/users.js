const { Router } = require('express');
const { check } = require('express-validator');

const { validate } = require('../middlewares/validations');
const { validateJWT } = require('../middlewares/jwt-validation');
const { createUser, getAllUsers, deleteUser } = require('../controllers/user');

const router = Router();

router.post('/create', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no tiene un formato valido').isEmail(),
    check('password', 'La contraseña debe contener más de 6 caracteres').isLength({ min: 6 }),
    check('phone', 'El nombre es obligatorio').not().isEmpty(),
    validate
], createUser)

router.post('/delete', [
    validateJWT,
    check('email', 'El correo no tiene un formato valido').isEmail(),
    validate
], deleteUser)

router.get('/', getAllUsers)

module.exports = router;