const express = require('express');
const router = express.Router();
const mw = require('../middleware')

const users = require('./routes');

router.post('/', mw.checkPermissions, users.create);
router.post('/register', users.register);
router.post('/login', users.login);
router.get('/logout', users.logout);

module.exports = router;