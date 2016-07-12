import * as dotenv from 'dotenv';
import { expect } from 'chai';
import { scoutsOauthBuilder } from './oauth-builder';
import { OauthConnection } from './oauth-connection';
import * as request from 'request';

var OAuth = require('oauth').OAuth;

dotenv.config({silent: true});
describe('Scouts Staging Server Test', function () {
   
    let connection: OauthConnection;
    before (function (done) {
         this.timeout(30000);
        connection  = scoutsOauthBuilder(OAuth, request, {key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST});
        connection.connect()
        .then(() => {
            done();
        })
        .catch(done)
    })
    it ('should connect', (done) => {
        expect(connection.isAuthorised).to.be.true;
        done();
    })
    it ('.get /profile/system/connect', (done) => {
        connection.get('profile/taxonomy_term/3.json')
        .then(payload => {
            expect(payload.data).to.not.be.empty;
            done();
        })
        .catch(done);
    })
})