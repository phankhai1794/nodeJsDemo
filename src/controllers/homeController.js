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

let addUser = async (req, res) => {
    try {
        return res.render("addorEditUser.ejs");
    } catch (e) {
        console.log(e);
    }
}

let getAllUsers = async (req, res) => {
    let users = await crudService.getUsers(req.query.page);
    return res.render("displayUsers.ejs", {users});
}

let getUserDetail = async (req, res) => {
    try {
        let user;
        if (req.params.id == 'add') {
            console.log('add');
            return res.render("addorEditUser.ejs", {user});
        } else if (req.params.id == 'edit') {
            console.log('edit');
            user = await crudService.getUserDetail(req.query.id);
            return res.render("addorEditUser.ejs", {user});
        } else {
            let user = await crudService.getUserDetail(req.params.id);
            return res.render("displayUserDetail.ejs", {
                user
            });
        }
    } catch (e) {
        console.log(e);
    }
}

let getCrud = async (req, res) => {
    let addNewUser = await crudService.createNewUser(req.body);
    if (addNewUser.success) {
        return res.redirect('/api/users');
    } else {
        return res.send(addNewUser);
    }
}

let removeUser = async (req, res) => {
    let remove = await crudService.removeUser(req.params.id);
    if (remove.success) {
        return res.redirect('/api/users');
    } else {
        return res.send(remove);
    }
}

module.exports = {
    getHomePage,
    getCrud,
    getAllUsers,
    getUserDetail,
    addUser,
    removeUser
}
