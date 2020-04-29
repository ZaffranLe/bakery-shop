const loginController = require("../api/controllers/account/login-controller");

function routes(app) {

    app.namespace('/api', function () {
        app.post('/login', loginController.getToken);
    });
}

module.exports = routes;
