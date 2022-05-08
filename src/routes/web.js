const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/users', homeController.getAllUsers);
    router.get('/users/:id', homeController.getUserDetail);
    router.post('/crud', homeController.getCrud);
    router.post('/users/remove/:id', homeController.removeUser);

    router.post('/login', userController.handleLogin);

    return app.use("/api", router);
}

module.exports = initWebRoutes;
