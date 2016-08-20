const models = require('../models');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    models.App.create({
        name: name,
        description: description
    }).then(app => {
        res.json({
            id: task.id,
            key: task.key
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.body.id;
    const key = req.body.key;
    models.App.findById(id).then(app => {
        if (key == app.key) {
            app.destroy();
            res.json({});
        } else {
            res.status(400);
            res.json({'error': 'invalid key'});
        }
    });
});

module.exports = router;
