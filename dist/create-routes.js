"use strict";
var url = require("url");
function createRoutes(app, options) {
    app.get('/', function (req, res, next) {
        res.render('pages/index', {
            user: req.user,
            url: req.url,
        });
    });
    app.get('/auth/account', function (req, res, next) {
        var _redirect = url.format({
            protocol: options.protocool,
            port: options.port,
            hostname: options.hostname,
            query: {
                created: Date.now(),
                id: req.query['access-token'],
                userId: req.query['user-id']
            }
        });
        res.redirect(_redirect);
        delete req.session.passport;
    });
    app.get('/login', function (req, res, next) {
        res.render('pages/login', {
            user: req.user,
            url: req.url,
        });
    });
}
exports.createRoutes = createRoutes;
//# sourceMappingURL=create-routes.js.map