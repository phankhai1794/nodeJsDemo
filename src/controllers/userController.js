import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing inputs parameter !'
        })
    }
    let data = await userService.handleLoginService(email, password);
    return res.status(200).json(data);
}

module.exports = {handleLogin}