const express = require('express');
const router = express.Router();

const roles = require('./routes');
const mw = require('../middleware')

router.post('/', mw.checkPermissions, roles.create);
router.get('/', mw.checkPermissions, roles.getAll);

module.exports = router;