"use strict";
const chai_1 = require('chai');
const dotenv = require('dotenv');
const oauth_builder_1 = require('./oauth-builder');
var OAuth = require('oauth').OAuth2;
var request = require('urllib');
dotenv.config({ silent: true });
describe('Scouts Staging Server Test', function () {
    let connection;
    before(function (done) {
        this.timeout(30000);
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, {
            key: process.env.KEY,
            secret: process.env.SECRET,
            username: process.env.USERNAME,
            password: process.env.PASS,
            host: process.env.HOST
        });
        connection.connect().then(() => { done(); }).catch(done);
    });
    it('should connect', (done) => {
        chai_1.expect(connection.isAuthorised).to.be.true;
        done();
    });
});
//# sourceMappingURL=oauth.connection.e2e.js.map