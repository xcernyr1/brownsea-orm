"use strict";
const mock_oauth_1 = require('./mock-oauth');
const chai_1 = require('chai');
describe('MockOauth', function () {
    before(() => {
        this.oauth = new mock_oauth_1.MockOauth('', '', '', '', '', '', '');
    });
    it('.getOAuthRequestToken', (done) => {
        this.oauth.getOAuthRequestToken((e, token, secret) => {
            chai_1.expect(token).to.equal('REQUESTTOKEN');
            chai_1.expect(secret).to.equal('REQUESTTOKENSECRET');
            done();
        });
    });
    it('.getOAuthAccesToken', (done) => {
        this.oauth.getOAuthAccessToken('REQUESTTOKEN', 'REQUESTTOKENSECRET', (err, token, secret) => {
            chai_1.expect(token).to.equal('OAUTHACCESSTOKEN');
            chai_1.expect(secret).to.equal('OAUTHACCESSTOKENSECRET');
            done();
        });
    });
    it('._perfomSecureRequest', (done) => {
        this.oauth._perfomSecureRequest('OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', 'GET', 'http://fake.com/profile/node/1.json', undefined, undefined, undefined, (err, data, res) => {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.get', (done) => {
        this.oauth.get('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', (err, data, res) => {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.delete', (done) => {
        this.oauth.get('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', (err, data, res) => {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.post', (done) => {
        this.oauth.post('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {}, 'application/json', (err, data, res) => {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
    it('.put', (done) => {
        this.oauth.put('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {}, 'application/json', (err, data, res) => {
            chai_1.expect(err).not.to.exist;
            chai_1.expect(data).to.be.string;
            chai_1.expect(res).to.be.empty;
            done();
        });
    });
});
//# sourceMappingURL=mock-oauth.spec.js.map