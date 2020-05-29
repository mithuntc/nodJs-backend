const express = require('express');
const router = express.Router();
const customer_service = require('./cust.service');

// routes
router.post('/customer', customer_add);
router.get('/', get_cust);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function customer_add(req, res, next) {
    customer_service.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function get_cust(req, res, next) {
    customer_service.getAll()
        .then(customers => res.json(customers))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    customer_service.getById(req.customer.sub)
        .then(customer => customer ? res.json(customer) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    customer_service.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    customer_service.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    customer_service.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}