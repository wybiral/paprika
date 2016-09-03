const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const App = sequelize.define('App', {
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
            auth: (id, key) => {
                return new Promise((resolve, reject) => {
                    App.findById(id).then(app => {
                        if (key === app.key) {
                            resolve(app);
                        } else {
                            reject('invalid key');
                        }
                    }).catch(() => {
                        reject('invalid app id');
                    });
                });
            }
        },
        getterMethods: {
        },
        setterMethods: {
        },
        instanceMethods: {
            toJSON: function() {
                return {
                    id: this.id,
                    name: this.name,
                    description: this.description
                };
            }
        }
    });
    return App;
};
