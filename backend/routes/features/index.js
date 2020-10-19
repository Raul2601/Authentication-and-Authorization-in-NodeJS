const mw = require('../middleware')

const feature = require('./routes');

module.exports = function (app) {

    app.get('/features/', mw.checkPermissions, feature.get);
    app.get('/features/routes', feature.getAllPermissions);

    return app;
}