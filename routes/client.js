const { Router } = require("express");
const { check } = require("express-validator");

const { validate } = require("../middlewares/validations");
const { validateJWT } = require("../middlewares/jwt-validation");
const { getAllClients } = require("../controllers/client");

const router = Router();

router.get("/", getAllClients);

module.exports = router;
