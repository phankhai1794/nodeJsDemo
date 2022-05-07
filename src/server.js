// express
const express = require("express");
const initWebRoutes = require("./routes/web");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine");
require('dotenv').config();
const { connectDb } = require("./services/db");

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
connectDb();
viewEngine(app);
initWebRoutes(app);


/* Error handler middleware */
const port = process.env.PORT || 3000;
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`Backend Nodejs app listening at http://localhost:${port}`);
});
