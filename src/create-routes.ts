import * as url from 'url';
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

export function createRoutes(app, options) {
    app.get('/', function (req, res, next) {
        res.render('pages/index', {
            user: req.user,
            url: req.url,
        });
    });
    app.get('/auth/account', ensureLoggedIn('/api/v1/users/login'), (req, res, next) => {
        let token = req.accessToken.toObject()
        let _redirect = url.format({
            protocol: options.protocool,
            port: options.port,
            hostname: options.hostname,
            query: {
                created: token.created,
                id: token.id,
                userId: token.userId
            }
        })
        res.redirect(_redirect)
        delete req.session.passport;
    });
    app.get('/login', function (req, res, next) {
        res.render('pages/login', {
            user: req.user,
            url: req.url,
        });
    });
}