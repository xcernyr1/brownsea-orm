"use strict";
var dotenv = require('dotenv');
var oauth_builder_1 = require('./oauth-builder');
var request = require('request');
var user_model_1 = require('./user-model');
dotenv.config({ silent: true });
var OAuth = require('oauth').OAuth;
describe('Connector For Scouts Oauth Implementation', function () {
    this.timeout(30000);
    var connection;
    var userInstance;
    before(function (done) {
        this.timeout(30000);
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, { key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST });
        connection.connect()
            .then(function () {
            user_model_1.User.setConnection(connection);
            done();
        })
            .catch(done);
    });
    it('should get a user', function (done) {
        user_model_1.User.get('102')
            .then(function (user) {
            userInstance = user;
            done();
        }).catch(function (err) {
            console.log('here');
            console.log(err.body);
            done(err);
        });
    });
    it('should update a user', function (done) {
        userInstance.update({ name: 'Doctor M' })
            .then(function (user) {
            done();
        })
            .catch(done);
    });
    it('should destroy the user', function (done) {
        userInstance.destroy()
            .then(function (payload) {
            done();
        })
            .catch(done);
    });
    it('should login a user', function (done) {
        user_model_1.User.login({ username: 'probinson', password: 'password' })
            .then(function (payload) {
            console.log(payload);
            done();
        })
            .catch(function (err) {
            console.log(err);
            done(err);
        });
    });
});
//# sourceMappingURL=user-model.e2e.js.map