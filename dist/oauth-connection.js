"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Browser = require('zombie');
var browser = new Browser({ waitDuration: 60 * 1000 });
var url_1 = require("url");
var errors_1 = require("./errors");
var OauthConnection = (function () {
    function OauthConnection(oauth, req, host, username, password) {
        this.oauth = oauth;
        this.req = req;
        this.host = host;
        this.username = username;
        this.password = password;
        this.defaults = {
            headers: { 'User-Agent': 'request' },
        };
    }
    OauthConnection.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, authorise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request()];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, this.authorise(request)];
                    case 2:
                        authorise = _a.sent();
                        this.access_token = authorise.access_token;
                        this.refresh_token = authorise.refresh_token;
                        return [2 /*return*/, { connected: true }];
                }
            });
        });
    };
    Object.defineProperty(OauthConnection.prototype, "isAuthorised", {
        get: function () {
            return Boolean(this.access_token && this.refresh_token);
        },
        enumerable: true,
        configurable: true
    });
    OauthConnection.prototype.get = function (url, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._request('get', url, null, query)];
            });
        });
    };
    OauthConnection.prototype.getOne = function (url, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._request('get', url, null, query, false)];
            });
        });
    };
    OauthConnection.prototype.post = function (url, body, query) {
        if (body === void 0) { body = {}; }
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._request('post', url, body, query)];
            });
        });
    };
    OauthConnection.prototype.patch = function (url, body, query) {
        if (body === void 0) { body = {}; }
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._request('patch', url, body, query)];
            });
        });
    };
    OauthConnection.prototype._request = function (method, url, body, query, many) {
        if (body === void 0) { body = {}; }
        if (query === void 0) { query = {}; }
        if (many === void 0) { many = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options;
            return __generator(this, function (_a) {
                options = Object.assign(this.defaults, {
                    method: method,
                    form: body,
                    url: this.host + url,
                    qs: Object.assign(query || {}, { access_token: this.access_token })
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!_this.isAuthorised)
                            console.warn('It appears that access_token || refresh_token are not set');
                        _this.req(options, function (err, res, data) {
                            if (err)
                                return reject(_this._errorHandler(err));
                            if (res.statusCode >= 401)
                                return reject(new Error('Permission Denied'));
                            resolve(Object.assign({}, _this.bodyMapper(JSON.parse(data), many), { res: res }));
                        });
                    })];
            });
        });
    };
    OauthConnection.prototype.authorise = function (payload) {
        if (payload === void 0) { payload = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.oauth.getOAuthAccessToken(payload.code, {
                            grant_type: 'authorization_code',
                            redirect_uri: 'https://httpbin.org/get'
                        }, function (err, access_token, refresh_token) {
                            if (err)
                                reject(new errors_1.CustomError({
                                    status: err.statusCode,
                                    message: 'Getting OAuth Request Token Failed'
                                }));
                            resolve({ access_token: access_token, refresh_token: refresh_token });
                        });
                    })];
            });
        });
    };
    OauthConnection.prototype.request = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var url;
            return __generator(this, function (_a) {
                url = this.oauth.getAuthorizeUrl({
                    client_secret: this.oauth._clientSecret,
                    response_type: 'code',
                    state: 'random1234',
                    scope: 'api',
                    redirect_uri: 'https://httpbin.org/get'
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        browser.visit(url, function () {
                            browser.fill('name', _this.username)
                                .fill('pass', _this.password)
                                .pressButton('op', function (err, res, body) {
                                var query = url_1.parse(browser.location.href, true);
                                browser.deleteCookies();
                                return err ? reject(err) : resolve(query.query);
                            });
                        });
                    })];
            });
        });
    };
    OauthConnection.prototype._customLoginError = function (payload) {
        console.log("Navigate to this and authorise:\n" + process.env.HOST + "oauth/authorize?oauth_token=" + payload.token);
    };
    OauthConnection.prototype.bodyMapper = function (payload, many) {
        if (!payload || !payload.data)
            return many ? { data: [], count: 0 } : { data: null, count: 0 };
        return many ? { data: payload.data, count: payload.count } :
            { data: payload.data[0], count: 1 };
    };
    OauthConnection.prototype._errorHandler = function (err) {
        switch (err.statusCode) {
            case 404:
                return new errors_1.Error404({ body: err, lib: 'Scouts API' });
            case 406:
                return new errors_1.Error400({ body: err, lib: 'Scouts API' });
            default:
                return new errors_1.Error500({ body: err, status: err.statusCode, lib: 'Scouts API' });
        }
    };
    OauthConnection.prototype.setTokenAndSecret = function (payload) {
        var access_token = payload.access_token, refresh_token = payload.refresh_token;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    };
    return OauthConnection;
}());
exports.OauthConnection = OauthConnection;
//# sourceMappingURL=oauth-connection.js.map