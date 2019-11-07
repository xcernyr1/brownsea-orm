"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oauth_connection_1 = require("./oauth-connection");
exports.REQUEST_TOKEN = '/oauth2/token';
exports.ACCESS_TOKEN = '/oauth2/token';
exports.AUTHORIZE = '/oauth2/authorize';
exports.scoutsOauthBuilder = function (OAuth, request, options) {
    var oauth = new OAuth(options.key, options.secret, options.host, exports.AUTHORIZE, exports.REQUEST_TOKEN);
    return new oauth_connection_1.OauthConnection(oauth, request, options.host, options.username, options.password);
};
//# sourceMappingURL=oauth-builder.js.map