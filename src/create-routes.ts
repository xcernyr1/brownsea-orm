var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

export function createRoutes (app) {
     app.get('/', function (req, res, next) {
        res.render('pages/index', { user: req.user,
            url: req.url,
        });
    });
    app.get('/auth/account', ensureLoggedIn('/api/v1/users/login'), (req, res, next) => {
        let referer = req.session.oauth.referer
        res.redirect(referer)
        delete req.session.oauth
    });
    app.get('/login', function (req, res, next) {
        res.render('pages/login', {
            user: req.user,
            url: req.url,
        });
    });
}