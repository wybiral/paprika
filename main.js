const config = require('./config');
const models = require('./models');
const app = require('./app');

models.sequelize.sync().then(sequelize => {
    app.listen(config.server.port);
});
