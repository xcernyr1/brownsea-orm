"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
function createRoutes(app, options) {
    app.get('/auth/account', function (req, res, next) {
        var _redirect = url.format({
            protocol: options.protocol,
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
}
exports.createRoutes = createRoutes;
//# sourceMappingURL=create-routes.js.map