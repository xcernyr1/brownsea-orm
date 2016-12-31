"use strict";
const chai_1 = require('chai');
const dotenv = require('dotenv');
const mock_oauth_1 = require('./mock-oauth');
const mock_request_1 = require('./mock-request');
const oauth_connection_1 = require('./oauth-connection');
dotenv.config({ silent: true });
describe.skip('Mock Connector For Scouts Oauth Implementation', () => {
    let connection;
    before(() => {
        connection = new oauth_connection_1.OauthConnection(new mock_oauth_1.MockOauth('fake.net/oauth/request_token', 'fake.net/oauth/access_token', 'TOKEN', 'SECRET'), mock_request_1.mockRequest, 'fake.net');
    });
    it('Request a Token for Authorisation', (done) => {
        connection.connect()
            .then((connection) => {
            chai_1.expect(connection.connected).to.be.true;
            done();
        })
            .catch(done);
    });
    it('Request a Request Token for Authorisation', (done) => {
        connection.request()
            .then((payload) => {
            chai_1.expect(payload).to.haveOwnProperty('token').haveOwnProperty('secret');
            done();
        })
            .catch(done);
    });
    it('.get request', (done) => {
        connection.get('url')
            .then(payload => {
            chai_1.expect(payload).to.not.be.undefined;
            done();
        })
            .catch(done);
    });
    it('.put request', (done) => {
        connection.patch('url', { name: 'nextfaze' })
            .then(payload => {
            chai_1.expect(payload.data.name).to.equal('nextfaze');
            done();
        })
            .catch(done);
    });
    it('.post request', (done) => {
        connection.post('url', { name: 'nextfaze' })
            .then(payload => {
            chai_1.expect(payload.data.name).to.equal('nextfaze');
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=oauth-connection.spec.js.map