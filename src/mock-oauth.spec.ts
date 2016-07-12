import { MockOauth } from './mock-oauth'
import { expect } from 'chai';
describe('MockOauth', function () {
    before(() => {
        this.oauth = new MockOauth('', '', '', '', '', '', '');
    })
    it('.getOAuthRequestToken', (done) => {
        this.oauth.getOAuthRequestToken((e, token, secret) => {
            expect(token).to.equal('REQUESTTOKEN');
            expect(secret).to.equal('REQUESTTOKENSECRET');
            done();
        })
    })
    it('.getOAuthAccesToken', (done) => {
        this.oauth.getOAuthAccessToken('REQUESTTOKEN', 'REQUESTTOKENSECRET', (err, token, secret) => {
            expect(token).to.equal('OAUTHACCESSTOKEN');
            expect(secret).to.equal('OAUTHACCESSTOKENSECRET');
            done();
        })
    })
    it('._perfomSecureRequest', (done) => {
        this.oauth._perfomSecureRequest('OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', 'GET', 'http://fake.com/profile/node/1.json', undefined, undefined, undefined, (err, data, res) => {
            expect(err).not.to.exist;
            expect(data).to.be.empty;
            expect(res).to.be.empty;
            done();
        })
    })
    it('.get', (done) => {
        this.oauth.get('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', (err, data, res) => {
            expect(err).not.to.exist;
            expect(data).to.be.empty;
            expect(res).to.be.empty;
            done();
        })
    })
    it('.delete', (done) => {
        this.oauth.get('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', (err, data, res) => {
            expect(err).not.to.exist;
            expect(data).to.be.empty;
            expect(res).to.be.empty;
            done();
        })
    })
    it('.post', (done) => {
        this.oauth.post('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {}, 'application/json', (err, data, res) => {
            expect(err).not.to.exist;
            expect(data).to.be.empty;
            expect(res).to.be.empty;
            done();
        })
    })
    it('.put', (done) => {
        this.oauth.put('http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {}, 'application/json', (err, data, res) => {
            expect(err).not.to.exist;
            expect(data).to.be.empty;
            expect(res).to.be.empty;
            done();
        })
    })
})