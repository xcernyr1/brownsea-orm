"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mock_oauth_1 = require("./mock-oauth");
describe('MockOauth', function () {
    var oauth;
    before(function () {
        oauth = new mock_oauth_1.MockOauth('', '', '', '', '', '', '');
    });
    it('.getOAuthRequestToken', function (done) {
        oauth.getOAuthRequestToken(function (e, token, secret) {
            chai_1.expect(token).to.equal('REQUESTTOKEN');
            chai_1.expect(secret).to.equal('REQUESTTOKENSECRET');
            done();
        });
    });
    it('.getOAuthAccesToken', function (done) {
        oauth.getOAuthAccessToken('REQUESTTOKEN', 'REQUESTTOKENSECRET', function (err, token, secret) {
            chai_1.expect(token).to.equal('OAUTHACCESSTOKEN');
            chai_1.expect(secret).to.equal('OAUTHACCESSTOKENSECRET');
            done();
        });
    });
    it('._perfomSecureRequest', function (done) {
        oauth._perfomSecureRequest('OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', 'GET', 'http://fake.com/profile/node/1.json', undefined, undefined, undefined, function (err, data, res) {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.get', function (done) {
        oauth.get('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', function (err, data, res) {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.delete', function (done) {
        oauth.get('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', function (err, data, res) {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.post', function (done) {
        oauth.post('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {}, 'application/json', function (err, data, res) {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.put', function (done) {
        oauth.put('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {}, 'application/json', function (err, data, res) {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
});
//# sourceMappingURL=mock-oauth.spec.js.map