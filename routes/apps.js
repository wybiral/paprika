const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    models.App.all().then(apps => {
        res.json(apps);
    });
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    models.App.create({
        name: name,
        description: description
    }).then(app => {
        res.json({
            id: app.id,
            key: app.key
        });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const key = req.body.key;
    models.App.auth(id, key).then(app => {
        const updates = {};
        ['name', 'description'].forEach(function(field) {
            if (field in req.body) {
                updates[field] = req.body[field];
            }
        });
        app.update(updates).then(() => {
            res.json({});
        });
    }).catch(error => {
        res.status(400);
        res.json({'error': error});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const key = req.body.key;
    models.App.auth(id, key).then(app => {
        app.destroy().then(() => {
            res.json({});
        });
    }).catch(error => {
        res.status(400);
        res.json({'error': error});
    });
});

module.exports = router;
