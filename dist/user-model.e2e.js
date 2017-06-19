"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var dotenv = require("dotenv");
var request = require("request");
var oauth_builder_1 = require("./oauth-builder");
var user_model_1 = require("./user-model");
dotenv.config({ silent: true });
var OAuth = require('oauth').OAuth2;
describe('Connector For Scouts Oauth Implementation', function () {
    var connection;
    var userInstance;
    before(function (done) {
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, {
            key: process.env.KEY,
            secret: process.env.SECRET,
            username: process.env.USERNAME,
            password: process.env.PASS,
            host: process.env.HOST
        });
        connection.connect()
            .then(function () {
            user_model_1.User.setConnection(connection);
            done();
        })
            .catch(done);
    });
    it('should get a user', function (done) {
        user_model_1.User.findById('102')
            .then(function (user) {
            chai_1.expect(user).to.be.instanceOf(user_model_1.User);
            done();
        })
            .catch(done);
    });
    it('should get many user', function (done) {
        user_model_1.User.find()
            .then(function (user) {
            chai_1.assert.lengthOf(user.models, 50);
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=user-model.e2e.js.map