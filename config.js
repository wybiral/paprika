module.exports = {
    server: {
        port: 80
    },
    db: {
        database: 'tasks',
        username: 'root',
        password: 'password',
        options: {
            dialect: 'sqlite',
            storage: 'storage.db',
            logging: false
        }
    }
};
