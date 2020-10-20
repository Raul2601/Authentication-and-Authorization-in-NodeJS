const mw = require('../middleware')
const users = require('./routes');

module.exports = function (app) {

    app.post('/users', mw.hasPermission(mw.permissions.UserCreate), users.create);

    return app;
}