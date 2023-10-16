const { request, response } = require("express");
const { Client, getClients } = require("../models/client");
const { logError } = require("../helpers/save-errors");

const getAllClients = (req, res = response) => {
  getClients()
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      logError(error, "getAllUsers");
      return res.json("Ha ocurrido un error");
    });
};

module.exports = {
  getAllClients,
};
