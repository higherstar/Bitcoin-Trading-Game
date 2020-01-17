const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/google', googleLogin);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/getByEmail', getByEmail);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
	userService.authenticate(req.body)
		.then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
		.catch(err => next(err));
}

function register(req, res, next) {
	userService.create(req.body)
		.then(user => res.json(user))
		.catch(err => next(err));
}

function getAll(req, res, next) {
	console.log('venus-->getAll', res);
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
	console.log('venus-->getById', res);
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByEmail(req, res, next) {
    userService.getByEmail(req.query.email)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function update(req, res, next) {
	console.log('venus------>update', res);
    userService.update(req.body)
				.then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
	console.log('venus-->Delet', res);
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function googleLogin(req, res, next) {
    userService.googleLogin(req.body)
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            next(err);
        });
}
