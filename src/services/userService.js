const db = require("../models");
const randToken = require('rand-token');
const bcrypt = require('bcryptjs');
const authMethod = require("../common/authMethod");
const jwtVariable = require("../common/jwt");

let handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResp = {};
            let checkExistingEmail = await db.User.findOne({where: {email}});
            if (!checkExistingEmail) {
                dataResp.errorCode = 1;
                dataResp.errorMessage = 'Your email is not exist in your system';
                resolve(dataResp);
            }
            const isPasswordValid = bcrypt.compareSync(password, checkExistingEmail.password);
            console.log(isPasswordValid);
            if (!isPasswordValid) {
                dataResp.errorCode = 1;
                dataResp.errorMessage = 'Your password is invalid';
                resolve(dataResp);
            }
            const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
            const dataForAccessToken = {
                username: checkExistingEmail.email,
            };
            const accessToken = await authMethod.generateToken(
                dataForAccessToken,
                accessTokenSecret,
                accessTokenLife,
            );
            if (!accessToken) {
                dataResp.errorCode = 1;
                dataResp.errorMessage = 'Login is failed !';
                resolve(dataResp);
            }
            let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
            dataResp.errorCode = 0;
            dataResp.errorMessage = 'Login success';
            dataResp.accessToken = accessToken;
            dataResp.refreshToken = refreshToken;
            dataResp.user = {
                email: checkExistingEmail.email,
                firstName: checkExistingEmail.firstName,
                lastName: checkExistingEmail.lastName,
                address: checkExistingEmail.address,
                gender: checkExistingEmail.gender,
                roleId: checkExistingEmail.roleId
            };
            // if (!user.refreshToken) {
            //     // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            //     await userModel.updateRefreshToken(user.username, refreshToken);
            // } else {
            //     // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            //     refreshToken = user.refreshToken;
            // }
            resolve(dataResp);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {handleLoginService};