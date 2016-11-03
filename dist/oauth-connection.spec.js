"use strict";
var dotenv = require('dotenv');
var chai_1 = require('chai');
var oauth_connection_1 = require('./oauth-connection');
var mock_oauth_1 = require('./mock-oauth');
var mock_request_1 = require('./mock-request');
dotenv.config({ silent: true });
describe('Connector For Scouts Oauth Implementation', function () {
    var connection;
    before(function () {
        connection = new oauth_connection_1.OauthConnection(new mock_oauth_1.MockOauth('fake.net/oauth/request_token', 'fake.net/oauth/access_token', 'TOKEN', 'SECRET'), mock_request_1.mockRequest, 'fake.net');
    });
    it('Request a Token for Authorisation', function (done) {
        connection.connect()
            .then(function (connection) {
            chai_1.expect(connection.connected).to.be.true;
            done();
        })
            .catch(done);
    });
    it('Request a Request Token for Authorisation', function (done) {
        connection.request()
            .then(function (payload) {
            chai_1.expect(payload).to.haveOwnProperty('token').haveOwnProperty('secret');
            done();
        })
            .catch(done);
    });
    it('Request Access Token for Authorisation', function (done) {
        connection.access({ token: 'REQUESTTOKEN', secret: 'REQUESTTOKENSECRET' })
            .then(function (payload) {
            chai_1.expect(connection.isAuthorised).to.be.true;
            done();
        })
            .catch(done);
    });
    it('.get request', function (done) {
        connection.get('url')
            .then(function (payload) {
            chai_1.expect(payload).to.not.be.undefined;
            done();
        })
            .catch(done);
    });
    it('.put request', function (done) {
        connection.put('url', { name: 'nextfaze' })
            .then(function (payload) {
            chai_1.expect(payload.data.name).to.equal('nextfaze');
            done();
        })
            .catch(done);
    });
    it('.post request', function (done) {
        connection.post('url', { name: 'nextfaze' })
            .then(function (payload) {
            chai_1.expect(payload.data.name).to.equal('nextfaze');
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=oauth-connection.spec.js.map