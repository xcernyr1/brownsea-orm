"use strict";
var url = require('url');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
function createRoutes(app, options) {
    app.get('/', function (req, res, next) {
        res.render('pages/index', {
            user: req.user,
            url: req.url,
        });
    });
    app.get('/auth/account', ensureLoggedIn('/api/v1/users/login'), function (req, res, next) {
        var token = req.accessToken.toObject();
        var _redirect = url.format({
            protocol: options.protocool,
            port: options.port,
            hostname: options.hostmname,
            query: {
                created: token.created,
                id: token.id,
                userId: token.userId
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