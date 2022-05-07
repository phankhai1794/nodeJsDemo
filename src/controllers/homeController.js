const db = require('../models/index');
const helper = require('../helper');
const sequelize = require('../services/db');
const config = require('../config');
const crudService = require('../services/CRUDService');

let getHomePage = async (req, res) => {
    let programming, chapter;
    try {
        return res.render("homepage.ejs");
    } catch (error) {
        console.log(error);
    }
}

let getAllUsers = async (req, res) => {
    let users = await crudService.getUsers(req.query.page);
    return res.render("displayUsers.ejs", {users});
}

let getCrud = async (req, res) => {
    let addNewUser = await crudService.createNewUser(req.body);
    return res.send(addNewUser);
}

module.exports = {
    getHomePage,
    getCrud,
    getAllUsers
}