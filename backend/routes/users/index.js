const mw = require('../middleware')
const users = require('./routes');

module.exports = function (app) {

    app.get('/users', mw.hasPermission(mw.permissions.UserRead), users.getAll);
    app.post('/users', mw.hasPermission(mw.permissions.UserCreate), users.create);

    return app;
}