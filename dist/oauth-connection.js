"use strict";
var errors_1 = require('./errors');
var OauthConnection = (function () {
    function OauthConnection(oauth, req, host, username, password) {
        this.oauth = oauth;
        this.req = req;
        this.host = host;
        this.username = username;
        this.password = password;
    }
    OauthConnection.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.request()
                .then(function (payload) { return (_this.authorise(payload)); })
                .then(function (payload) { return (_this.access(payload)); })
                .then(function (payload) {
                _this.setTokenAndSecret(payload);
                resolve({ connected: true });
            })
                .catch(function (err) {
                reject(new Error('Failed to Connect' + err));
            });
        });
    };
    Object.defineProperty(OauthConnection.prototype, "isAuthorised", {
        get: function () {
            return Boolean(this.access_token && this.access_secret);
        },
        enumerable: true,
        configurable: true
    });
    OauthConnection.prototype.get = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isAuthorised)
                console.warn('It appears that access_token || access_secret are not set');
            _this.oauth.get(_this.host + url, _this.access_token, _this.access_secret, function (err, data, res) {
                if (err)
                    return reject(_this._errorHandler(err));
                resolve({ data: JSON.parse(data), res: res });
            });
        });
    };
    OauthConnection.prototype.post = function (url, body, post_content_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isAuthorised)
                console.warn('It appears that access_token || access_secret are not set');
            _this.oauth.post(_this.host + url, _this.access_token, _this.access_secret, body, post_content_type, function (err, data, res) {
                if (err)
                    return reject(_this._errorHandler(err));
                resolve({ data: JSON.parse(data), res: res });
            });
        });
    };
    OauthConnection.prototype.put = function (url, body, post_content_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isAuthorised)
                console.warn('It appears that access_token || access_secret are not set');
            _this.oauth.put(_this.host + url, _this.access_token, _this.access_secret, body, post_content_type, function (err, data, res) {
                if (err)
                    return reject(_this._errorHandler(err));
                resolve({ data: JSON.parse(data), res: res });
            });
        });
    };
    OauthConnection.prototype.delete = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isAuthorised)
                console.warn('It appears that access_token || access_secret are not set');
            _this.oauth.delete(_this.host + url, _this.access_token, _this.access_secret, function (err, data, res) {
                if (err)
                    return reject(_this._errorHandler(err));
                resolve({ data: JSON.parse(data), res: res });
            });
        });
    };
    OauthConnection.prototype.authorise = function (payload) {
        var _this = this;
        var jar = this.req.jar();
        var request = this.req.defaults({ jar: jar });
        return new Promise(function (resolve, reject) {
            request.post(_this.host + ("modal_forms/ajax/login?destination=/oauth/authorize&oauth_token=" + payload.token), { form: {
                    'form_id': 'user_login',
                    'name': _this.username,
                    'op': 'Log in',
                    'pass': _this.password,
                } }, function (err, res, body) {
                if (err)
                    return reject(new errors_1.CustomError({
                        status: err.statusCode,
                        message: 'Custom Login Failed'
                    }));
                request.post(_this.host + "oauth/authorize?oauth_token=" + payload.token, { form: {
                        "form_id": "oauth_common_form_authorize_override",
                        "levels[default]": 1,
                        "op": "Grant access"
                    } }, function (err, res2, body) {
                    if (err)
                        return reject(new errors_1.CustomError({
                            status: err.statusCode,
                            message: 'Custom Authorize Token Failed'
                        }));
                    resolve(payload);
                });
            });
        });
    };
    OauthConnection.prototype.request = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.oauth.getOAuthRequestToken(function (err, token, secret) {
                if (err)
                    return reject(new errors_1.CustomError({
                        status: err.statusCode,
                        message: 'Getting OAuth Request Token Failed'
                    }));
                resolve({ token: token, secret: secret });
            });
        });
    };
    OauthConnection.prototype.access = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.oauth.getOAuthAccessToken(payload.token, payload.secret, function (err, access_token, access_secret) {
                if (err) {
                    _this._customLoginError(payload);
                    reject(new errors_1.CustomError({
                        status: err.statusCode,
                        message: 'Getting OAuth Access Token Failed'
                    }));
                }
                resolve({ access_token: access_token, access_secret: access_secret });
            });
        });
    };
    OauthConnection.prototype._customLoginError = function (payload) {
        console.log("Navigate to this and authorise:\n" + process.env.HOST + "oauth/authorize?oauth_token=" + payload.token);
    };
    OauthConnection.prototype._errorHandler = function (err) {
        switch (err.statusCode) {
            case 404:
                return new errors_1.Error404({
                    body: err,
                    lib: 'Scouts API'
                });
            case 406:
                return new errors_1.Error400({
                    body: err,
                    lib: 'Scouts API'
                });
            default:
                return new errors_1.Error500({
                    body: err,
                    status: err.statusCode,
                    lib: 'Scouts API'
                });
        }
    };
    OauthConnection.prototype.setTokenAndSecret = function (payload) {
        var access_token = payload.access_token, access_secret = payload.access_secret;
        this.access_token = access_token;
        this.access_secret = access_secret;
    };
    return OauthConnection;
}());
exports.OauthConnection = OauthConnection;
//# sourceMappingURL=oauth-connection.js.map