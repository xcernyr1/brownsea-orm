"use strict";
const dotenv = require('dotenv');
const mock_oauth_1 = require('./mock-oauth');
const mock_request_1 = require('./mock-request');
const oauth_connection_1 = require('./oauth-connection');
const user_model_1 = require('./user-model');
dotenv.config({ silent: true });
describe('Connector For Scouts Oauth Implementation', () => {
    let connection;
    before((done) => {
        connection = new oauth_connection_1.OauthConnection(new mock_oauth_1.MockOauth('fake.net/oauth/request_token', 'fake.net/oauth/access_token', 'TOKEN', 'SECRET'), mock_request_1.mockRequest, 'fake.net');
        connection.connect()
            .then(connect => {
            user_model_1.User.setConnection(connection);
            done();
        })
            .catch(done);
    });
    it('should get a user', (done) => { user_model_1.User.findById('1').then(user => { done(); }).catch(done); });
});
//# sourceMappingURL=user-model.spec.js.map