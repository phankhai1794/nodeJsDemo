// const mysql = require('mysql2/promise');
const config = require('../config');
// async function query(sql, params) {
//     const connection = await mysql.createConnection(config.db);
//     const [results,] = await connection.execute(sql, params);

//     return results;
// }

// module.exports = {
//     query
// }


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    storage: 'path/to/database.sqlite' // Chỉ dùng khi MS là SQLite
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDb };
