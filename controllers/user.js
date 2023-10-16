const { request, response } = require('express');
const { User, getUsers, deleteUserByEmail } = require('../models/user');
const { logError } = require('../helpers/save-errors');

const createUser = (req, res = response) => {
    const { name, email, password, phone } = req.body;
    //guardar en DB
    const newUser = new User(name, email, password, phone);
    newUser.saveInDB()
        .then(result => {
            return res.json(result);
        })
        .catch(error => {
            logError(error, 'saveInDB');
            return res.json(error);
        })
}

const getAllUsers = (req, res = response) => {
    getUsers()
        .then(result => {
            return res.json(result);
        })
        .catch(error => {
            logError(error, 'getAllUsers');
            return res.json('Ha ocurrido un error');
        });
}

const deleteUser = (req, res = response) => {
    const { email } = req.body;
    deleteUserByEmail(email)
        .then(result => {
            return res.json(result);
        })
        .catch(error => {
            logError(error, 'deleteUser');
            return res.json('Ha ocurrido un error');
        })
}

module.exports = {
    createUser,
    getAllUsers,
    deleteUser
}