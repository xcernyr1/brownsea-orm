"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var mock_oauth_1 = require("./mock-oauth");
var mock_request_1 = require("./mock-request");
var oauth_connection_1 = require("./oauth-connection");
var user_model_1 = require("./user-model");
dotenv.config({ silent: true });
describe('Connector For Scouts Oauth Implementation', function () {
    var connection;
    before(function (done) {
        connection = new oauth_connection_1.OauthConnection(new mock_oauth_1.MockOauth('fake.net/oauth/request_token', 'fake.net/oauth/access_token', 'TOKEN', 'SECRET'), mock_request_1.mockRequest, 'fake.net');
        connection.connect()
            .then(function (connect) {
            user_model_1.User.setConnection(connection);
            done();
        })
            .catch(done);
    });
    it('should get a user', function (done) { user_model_1.User.findById('1').then(function (user) { done(); }).catch(done); });
});
//# sourceMappingURL=user-model.spec.js.map