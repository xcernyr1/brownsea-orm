import * as dotenv from 'dotenv';
import { expect } from 'chai';
import { OauthConnection } from './oauth-connection';
import { MockOauth } from './mock-oauth';
import { mockRequest} from './mock-request';
import { scoutsOauthBuilder } from './oauth-builder';
import  * as request from  'request';
import { User } from './user-model';
dotenv.config({silent: true});
var OAuth = require('oauth').OAuth;


describe('Connector For Scouts Oauth Implementation', function () {
    this.timeout(30000);
    let connection:OauthConnection;
    let userInstance: User;
    before(function (done) {
        this.timeout(30000);
        connection = scoutsOauthBuilder(OAuth, request, { key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST });
        connection.connect()
            .then(() => {
                User.setConnection(connection);
                done();
        })
            .catch(done);
    });
    it ('should get a user', done => {
        User.get('102')
        .then(user => {
            userInstance = user;
            done();
        }).catch((err) => {
            console.log('here')
            console.log(err.body);
            done(err);
        });
    })
    it('should update a user', done => {
        userInstance.update({name: 'Doctor M'})
        .then(user => {
            done();
        })
        .catch(done)
    })
    it('should destroy the user', done => {
        userInstance.destroy()
        .then(payload => {
            done();
        })
        .catch(done);
    })
    it('should login a user', done => {
        User.login({username: 'probinson', password: 'password'})
        .then(payload => {
            console.log(payload);
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })
})
