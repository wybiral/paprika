const fs = require('fs');
const path = require('path');
const config = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db.options
);
const db = {};

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        const filepath = path.join(__dirname, file);
        const model = sequelize.import(filepath);
        db[model.name] = model;
    }
});

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
