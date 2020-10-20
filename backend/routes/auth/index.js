const auth = require('./routes');

module.exports = function (app) {

    app.post('/register', auth.register);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    return app;
}