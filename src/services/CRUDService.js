import db from "../models";
import helper from "../helper";
import config from "../config";
const userCommon = require('../common/userCommon');
const Cryptr = require('cryptr');

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await userCommon.hashUserPassword(data.password);
            const dataSubmit = {
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === 1 ? true : false,
                roleId: data.role,
                phoneNumber: data.phoneNumber,
                positionId: data.positionId,
            };
            if (data.userId) {
                let userUpdate = await db.User.findOne({where: { id: data.userId }});
                await userUpdate.update(dataSubmit);
            } else {
                await db.User.create(dataSubmit);
            }
            resolve({
                success: true
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getUsers = (currentPage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = helper.getOffset(currentPage, config.listPerPage);
            let data = await db.User.findAll({offset, limit: config.listPerPage});
            resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({where: { id }});
            resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

let removeUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.destroy({where: { id }});
            resolve({
                success: true
            });
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {createNewUser, getUsers, getUserDetail, removeUser};
