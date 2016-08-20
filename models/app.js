const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('App', {
        key: {
            type: DataTypes.CHAR(16),
            unique: true,
            allowNull: false,
            defaultValue: () => crypto.randomBytes(16).toString('hex')
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
        },
        getterMethods: {
        },
        setterMethods: {
        },
        instanceMethods: {
        }
    });
};
