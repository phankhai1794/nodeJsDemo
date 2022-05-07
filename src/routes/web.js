const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/users', homeController.getAllUsers);
    router.get('/users/:id', homeController.getUserDetail);

    router.post('/crud', homeController.getCrud);
    router.post('/users/remove/:id', homeController.removeUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;
