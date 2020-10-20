const mw = require('../middleware')

const feature = require('./routes');

module.exports = function (app) {

    app.get('/features', mw.hasPermission(mw.permissions.Feature1), feature.get);

    return app;
}