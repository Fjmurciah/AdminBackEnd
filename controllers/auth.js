const { response, request } = require("express");
const { logError } = require("../helpers/save-errors");
const { verifyLogin, getUserByEmail } = require("../models/user");
const { generateJWT } = require("../helpers/jwt-generate");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let login = false;
    await verifyLogin(email, password)
      .then((result) => {
        login = result;
      })
      .catch((error) => {
        login = false;
        logError(error, "login");
        res.status(500).json({
          msg: "Hubo un error",
        });
      });

    if (!login) {
      return res.status(401).json({
        msg: "Tus datos no son correctos",
      });
    }

    const token = await generateJWT(email);

    res.json({
      msg: "Login ok",
      token,
    });
  } catch (error) {
    logError(error, "login");
    return res.status(500).json({
      msg: "Ha ocurrido un error",
    });
  }
};

const renew = async (req = request, res = response) => {
  const token = req.header("token");

  try {
    return res.status(200).json({
      msg: "Usuario autorizado",
      token: token,
    });
  } catch (error) {
    logError(error, "login");
    return res.status(500).json({
      msg: "Ha ocurrido un error",
    });
  }
};

module.exports = {
  login,
  renew,
};
