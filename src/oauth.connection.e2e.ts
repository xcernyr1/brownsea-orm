import {expect} from 'chai';
import * as dotenv from 'dotenv';
// import * as request from 'request';

import {scoutsOauthBuilder} from './oauth-builder';
import {OauthConnection} from './oauth-connection';

var OAuth = require('oauth').OAuth2;
var request = require('urllib');
dotenv.config({silent: true});
describe('Scouts Staging Server Test', function() {

  let connection: OauthConnection;
  before(function(done) {
    this.timeout(30000);
    connection = scoutsOauthBuilder(OAuth, request, {
      key: process.env.KEY,
      secret: process.env.SECRET,
      username: process.env.USERNAME,
      password: process.env.PASS,
      host: process.env.HOST
    });
    connection.connect()
        .then(() => {
          debugger;
          done();
        })
        .catch((err) => {
          debugger;
          done();
        })
  })
  it('should connect', (done) => {
    expect(connection.isAuthorised).to.be.true;
    done();
  })
})