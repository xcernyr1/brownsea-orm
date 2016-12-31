"use strict";
const chai_1 = require('chai');
const dotenv = require('dotenv');
const request = require('request');
const oauth_builder_1 = require('./oauth-builder');
const user_model_1 = require('./user-model');
dotenv.config({ silent: true });
var OAuth = require('oauth').OAuth2;
describe('Connector For Scouts Oauth Implementation', function () {
    this.timeout(30000);
    let connection;
    let userInstance;
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
            .then(() => {
            user_model_1.User.setConnection(connection);
            done();
        })
            .catch(done);
    });
    it('should get a user', done => {
        user_model_1.User.findById('102')
            .then(user => {
            chai_1.expect(user).to.be.instanceOf(user_model_1.User);
            done();
        })
            .catch(done);
    });
    it('should get many user', done => {
        user_model_1.User.find()
            .then(user => {
            chai_1.assert.lengthOf(user, 50);
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=user-model.e2e.js.map