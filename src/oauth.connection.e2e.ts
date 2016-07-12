import { expect } from 'chai';
import { scoutsOauthBuilder } from './oauth-builder';
import { OauthConnection } from './oauth-connection';
import * as request from 'request';
import { OAUTH_ACCESS_TOKEN, OAUTH_ACCESS_TOKEN_SECRET, KEY, SECRET} from './test.config';
var OAuth = require('oauth').OAuth;


describe('Scouts Staging Server Test', function () {
   
    let connection: OauthConnection;
    before (function (done) {
         this.timeout(30000);
        connection  = scoutsOauthBuilder(OAuth, request, KEY, SECRET, OAUTH_ACCESS_TOKEN, OAUTH_ACCESS_TOKEN_SECRET);
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
            console.log(payload.data)
            expect(payload.data).to.not.be.empty;
            done();
        })
        .catch(done);
    })
})