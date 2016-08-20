const models = require('../models');
const express = require('express');
const router = express.Router();

const clients = new Set();

router.ws('/', (ws, req) => {
    clients.add(ws);
    ws.on('close', evt => {
        clients.delete(ws);
    });
});

router.post('/', (req, res) => {
    const id = req.body.id;
    models.App.findById(id).then(app => {
        const key = req.body.key;
        if (key == app.key) {
            const update = {
                app: {
                    id: app.id,
                    name: app.name
                },
                title: req.body.title,
                body: req.body.body
            };
            const json = JSON.stringify(update);
            clients.forEach(ws => ws.send(json));
            res.json({});
        } else {
            res.status(400);
            res.json({'error': 'invalid key'});
        }
    });
});

module.exports = router;
