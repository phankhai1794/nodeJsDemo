const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/users', homeController.getAllUsers);
    router.post('/crud', homeController.getCrud);

    return app.use("/", router);
}

module.exports = initWebRoutes;
