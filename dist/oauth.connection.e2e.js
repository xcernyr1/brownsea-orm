"use strict";
var dotenv = require('dotenv');
var chai_1 = require('chai');
var oauth_builder_1 = require('./oauth-builder');
var request = require('request');
var OAuth = require('oauth').OAuth;
dotenv.config({ silent: true });
describe('Scouts Staging Server Test', function () {
    var connection;
    before(function (done) {
        this.timeout(30000);
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, { key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST });
        connection.connect()
            .then(function () {
            done();
        })
            .catch(done);
    });
    it('should connect', function (done) {
        chai_1.expect(connection.isAuthorised).to.be.true;
        done();
    });
    it('.get /profile/system/connect', function (done) {
        connection.get('profile/taxonomy_term/3.json')
            .then(function (payload) {
            chai_1.expect(payload.data).to.not.be.empty;
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=oauth.connection.e2e.js.map