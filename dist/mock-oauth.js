"use strict";
class MockOauth {
    constructor(reqEnd, accEnd, key, secret, version, callbackUrl, signatureMethod) {
        this.requestToken = 'REQUESTTOKEN';
        this.requestTokenSecret = 'REQUESTTOKENSECRET';
        this.oauthAccessToken = 'OAUTHACCESSTOKEN';
        this.oAuthAccessTokenSecret = 'OAUTHACCESSTOKENSECRET';
    }
    getOAuthRequestToken(cb) {
        cb(null, this.requestToken, this.requestTokenSecret, { statusCode: 200 });
    }
    getOAuthAccessToken(token, secret, cb) {
        if (token === this.requestToken && secret === this.requestTokenSecret)
            return cb(null, this.oauthAccessToken, this.oAuthAccessTokenSecret);
        return cb({ statusCode: 401, data: 'Token Not Found' });
    }
    _perfomSecureRequest(oauth_token, oauth_token_secret, method, url, extra_params, post_body, post_content_type, cb) {
        if (oauth_token_secret === this.oAuthAccessTokenSecret)
            return cb(null, post_body ? JSON.stringify(post_body) : JSON.stringify({}), {});
        return cb(new Error());
    }
    get(url, oauth_token, oauth_token_secret, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'GET', url, undefined, undefined, undefined, cb);
    }
    delete(url, oauth_token, oauth_token_secret, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'GET', url, undefined, undefined, undefined, cb);
    }
    put(url, oauth_token, oauth_token_secret, post_body, post_content_type, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'PUT', url, undefined, post_body, post_content_type, cb);
    }
    post(url, oauth_token, oauth_token_secret, post_body, post_content_type, cb) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'POST', url, undefined, post_body, post_content_type, cb);
    }
}
exports.MockOauth = MockOauth;
//# sourceMappingURL=mock-oauth.js.map