import db from "../models";
import helper from "../helper";
import config from "../config";
const userCommon = require('../common/userCommon');

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPass = await userCommon.hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPass,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
                positionId: data.positionId,
            });
            resolve('add success');
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

module.exports = {createNewUser, getUsers};