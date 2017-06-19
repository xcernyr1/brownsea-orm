"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockOauth = (function () {
    function MockOauth(reqEnd, accEnd, key, secret, version, callbackUrl, signatureMethod) {
        this.requestToken = 'REQUESTTOKEN';
        this.requestTokenSecret = 'REQUESTTOKENSECRET';
        this.oauthAccessToken = 'OAUTHACCESSTOKEN';
        this.oAuthAccessTokenSecret = 'OAUTHACCESSTOKENSECRET';
    }
    MockOauth.prototype.getOAuthRequestToken = function (cb) {
        cb(null, this.requestToken, this.requestTokenSecret, { statusCode: 200 });
    };
    MockOauth.prototype.getOAuthAccessToken = function (token, secret, cb) {
        if (token === this.requestToken && secret === this.requestTokenSecret)
            return cb(null, this.oauthAccessToken, this.oAuthAccessTokenSecret);
        return cb({ statusCode: 401, data: 'Token Not Found' });
    };
    MockOauth.prototype._perfomSecureRequest = function (oauth_token, oauth_token_secret, method, url, extra_params, post_body, post_content_type, cb) {
        if (oauth_token_secret === this.oAuthAccessTokenSecret)
            return cb(null, post_body ? JSON.stringify(post_body) : JSON.stringify({}), {});
        return cb(new Error());
    };
    MockOauth.prototype.get = function (url, oauth_token, oauth_token_secret, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'GET', url, undefined, undefined, undefined, cb);
    };
    MockOauth.prototype.delete = function (url, oauth_token, oauth_token_secret, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'GET', url, undefined, undefined, undefined, cb);
    };
    MockOauth.prototype.put = function (url, oauth_token, oauth_token_secret, post_body, post_content_type, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'PUT', url, undefined, post_body, post_content_type, cb);
    };
    MockOauth.prototype.post = function (url, oauth_token, oauth_token_secret, post_body, post_content_type, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'POST', url, undefined, post_body, post_content_type, cb);
    };
    return MockOauth;
}());
exports.MockOauth = MockOauth;
//# sourceMappingURL=mock-oauth.js.map