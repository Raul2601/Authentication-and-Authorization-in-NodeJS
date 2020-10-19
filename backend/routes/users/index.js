const mw = require('../middleware')
const users = require('./routes');

module.exports = function (router) {

    router.post('/users', mw.checkPermissions, users.create);
    router.post('/users/register', users.register);
    router.post('/users/login', users.login);
    router.get('/users/logout', users.logout);

    return router;
}