const loginController = require("../api/controllers/account/login-controller");

function routes(app, passport) {

    app.namespace('/api', function () {
        app.get('/login', loginController.getAccountInfo);
    });
}

module.exports = routes;