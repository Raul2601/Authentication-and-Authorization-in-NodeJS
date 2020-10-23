const permissions = require('./routes');
const mw = require('../middleware')

module.exports = function (app) {

    app.post('/permissions', mw.hasPermission(mw.permissions.RoleCreate), permissions.create);
    app.get('/permissions', mw.hasPermission(mw.permissions.RoleRead), permissions.getAll);
    app.get('/permissions/:id', mw.hasPermission(mw.permissions.RoleRead), permissions.getById);
    app.put('/permissions/:id', mw.hasPermission(mw.permissions.RoleUpdate), permissions.update);
    app.delete('/permissions/:id', mw.hasPermission(mw.permissions.RoleDelete), permissions.delete);

    return app;
}