"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Browser = require('zombie');
const browser = new Browser();
const url_1 = require('url');
const errors_1 = require('./errors');
class OauthConnection {
    constructor(oauth, req, host, username, password) {
        this.oauth = oauth;
        this.req = req;
        this.host = host;
        this.username = username;
        this.password = password;
        this.defaults = {
            headers: { 'User-Agent': 'request' },
        };
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = yield this.request();
            let authorise = yield this.authorise(request);
            this.access_token = authorise.access_token;
            this.refresh_token = authorise.refresh_token;
            return { connected: true };
        });
    }
    get isAuthorised() {
        return Boolean(this.access_token && this.refresh_token);
    }
    get(url, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('get', url, null, query);
        });
    }
    getOne(url, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('get', url, null, query, false);
        });
    }
    post(url, body = {}, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('post', url, body, query);
        });
    }
    patch(url, body = {}, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request('patch', url, body, query);
        });
    }
    _request(method, url, body = {}, query = {}, many = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = Object.assign(this.defaults, {
                method,
                form: body,
                url: this.host + url,
                qs: Object.assign(query || {}, { access_token: this.access_token })
            });
            return new Promise((resolve, reject) => {
                if (!this.isAuthorised)
                    console.warn('It appears that access_token || refresh_token are not set');
                this.req(options, (err, res, data) => {
                    if (err)
                        return reject(this._errorHandler(err));
                    if (res.statusCode >= 401)
                        return reject(new Error('Permission Denied'));
                    resolve({ data: this.bodyMapper(JSON.parse(data), many), res });
                });
            });
        });
    }
    authorise(payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.oauth.getOAuthAccessToken(payload.code, {
                    grant_type: 'authorization_code',
                    redirect_uri: 'https://httpbin.org/get'
                }, (err, access_token, refresh_token) => {
                    if (err)
                        reject(new errors_1.CustomError({
                            status: err.statusCode,
                            message: 'Getting OAuth Request Token Failed'
                        }));
                    resolve({ access_token, refresh_token });
                });
            });
        });
    }
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.oauth.getAuthorizeUrl({
                client_secret: this.oauth._clientSecret,
                response_type: 'code',
                state: 'random1234',
                scope: 'api',
                redirect_uri: 'https://httpbin.org/get'
            });
            return new Promise((resolve, reject) => {
                browser.visit(url, () => {
                    browser.fill('name', this.username)
                        .fill('pass', this.password)
                        .pressButton('op', (err, res, body) => {
                        let query = url_1.parse(browser.location.href, true);
                        browser.deleteCookies();
                        return err ? reject(err) : resolve(query.query);
                    });
                });
            });
        });
    }
    _customLoginError(payload) {
        console.log(`Navigate to this and authorise:\n${process.env.HOST}oauth/authorize?oauth_token=${payload.token}`);
    }
    bodyMapper(payload, many) {
        if (!payload || !payload.data)
            return many ? [] : {};
        return many ? payload.data : payload.data[0];
    }
    _errorHandler(err) {
        switch (err.statusCode) {
            case 404:
                return new errors_1.Error404({ body: err, lib: 'Scouts API' });
            case 406:
                return new errors_1.Error400({ body: err, lib: 'Scouts API' });
            default:
                return new errors_1.Error500({ body: err, status: err.statusCode, lib: 'Scouts API' });
        }
    }
    setTokenAndSecret(payload) {
        const { access_token, refresh_token } = payload;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}
exports.OauthConnection = OauthConnection;
//# sourceMappingURL=oauth-connection.js.map