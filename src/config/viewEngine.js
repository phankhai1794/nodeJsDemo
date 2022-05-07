const express = require("express");

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs"); //jsp, blade
    app.set("views", "./src/view");
}

module.exports = configViewEngine;