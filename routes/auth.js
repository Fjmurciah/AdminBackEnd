const { Router } = require("express");
const { check } = require("express-validator");
const { validate } = require("../middlewares/validations");
const { login, renew } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/jwt-validation");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validate,
  ],
  login
);

router.get("/renew", [validateJWT, validate], renew);

module.exports = router;
