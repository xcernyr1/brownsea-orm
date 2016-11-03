"use strict";
var oauth_connection_1 = require('./oauth-connection');
exports.REQUEST_TOKEN = 'oauth/request_token';
exports.ACCESS_TOKEN = 'oauth/access_token';
exports.AUTHORIZE = 'oauth/authorize';
exports.SIGNATURE_METHOD = 'HMAC-SHA1';
exports.scoutsOauthBuilder = function (OAuth, request, options) {
    var oauth = new OAuth("" + (options.host + exports.REQUEST_TOKEN), "" + (options.host + exports.ACCESS_TOKEN), options.key, options.secret, null, 'https://nextfaze.com', exports.SIGNATURE_METHOD);
    return new oauth_connection_1.OauthConnection(oauth, request, options.host, options.username, options.password);
};
//# sourceMappingURL=oauth-builder.js.map