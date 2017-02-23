"use strict";
var chai_1 = require("chai");
var dotenv = require("dotenv");
var oauth_builder_1 = require("./oauth-builder");
var OAuth = require('oauth').OAuth2;
var request = require('urllib');
dotenv.config({ silent: true });
describe('Scouts Staging Server Test', function () {
    var connection;
    before(function (done) {
        this.timeout(30000);
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, {
            key: process.env.KEY,
            secret: process.env.SECRET,
            username: process.env.USERNAME,
            password: process.env.PASS,
            host: process.env.HOST
        });
        connection.connect()
            .then(function () {
            debugger;
            done();
        })
            .catch(function (err) {
            debugger;
            done();
        });
    });
    it('should connect', function (done) {
        chai_1.expect(connection.isAuthorised).to.be.true;
        done();
    });
});
//# sourceMappingURL=oauth.connection.e2e.js.map