const roles = require('./routes');
const mw = require('../middleware')

module.exports = function (app) {

    app.post('/roles', mw.hasPermission(mw.permissions.RoleCreate), roles.create);
    app.get('/roles', mw.hasPermission(mw.permissions.RoleRead), roles.getAll);
    app.get('/roles/:id', mw.hasPermission(mw.permissions.RoleRead), roles.getById);
    app.put('/roles/:id', mw.hasPermission(mw.permissions.RoleUpdate), roles.update);
    app.delete('/roles/:id', mw.hasPermission(mw.permissions.RoleDelete), roles.delete);

    return app;
}