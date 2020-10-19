const roles = require('./routes');
const mw = require('../middleware')

module.exports = function (router) {

    router.post('/roles', mw.checkPermissions, roles.create);
    router.get('/roles', mw.checkPermissions, roles.getAll);
    router.get('/roles/:id', mw.checkPermissions, roles.getById);
    router.put('/roles/:id', mw.checkPermissions, roles.update);
    router.delete('/roles/:id', mw.checkPermissions, roles.delete);

    return router;
}