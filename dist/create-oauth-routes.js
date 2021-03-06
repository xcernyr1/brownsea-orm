"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require('querystring');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var mock_scout_user_1 = require("./mock-scout-user");
var querystring = require('querystring');
function createOauthRoutes(app) {
    app.get('/oauth/authorize', function (req, res, next) {
        res.render('pages/mock', {
            user: req.user,
            url: req.url,
            oauth_token: req.query.oauth_token
        });
    });
    app.post('/oauth/access_token', function (req, res, next) {
        res.send(querystring.encode({
            oauth_token: req.query.oauth_token,
            oauth_token_secret: req.query.oauth_token
        }));
    });
    app.post('/oauth/request_token', function (req, res, next) {
        res.send(querystring.encode({
            oauth_token: 'Z6eEdO8MOmk394WozF5oKyuAv855l4Mlqo7hhlSLik',
            oauth_token_secret: 'Z6eEdO8MOmk394WozF5oKyuAv855l4Mlqo7hhlSLik'
        }));
    });
    app.post('/profile/system/connect.json', function (req, res, next) {
        res.send(mock_scout_user_1.MockUser());
    });
    app.get('/profile/taxonomy_term/:id', function (req, res, next) {
        res.send(JSON.stringify({ name: 'Albania' }));
    });
}
exports.createOauthRoutes = createOauthRoutes;
//# sourceMappingURL=create-oauth-routes.js.map