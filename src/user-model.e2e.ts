
import {assert, expect} from 'chai';
import * as dotenv from 'dotenv';
import * as request from 'request';

import {MockOauth} from './mock-oauth';
import {mockRequest} from './mock-request';
import {scoutsOauthBuilder} from './oauth-builder';
import {OauthConnection} from './oauth-connection';
import {User} from './user-model';

dotenv.config({silent: true});
var OAuth = require('oauth').OAuth2;


describe('Connector For Scouts Oauth Implementation', function() {
  this.timeout(30000);
  let connection: OauthConnection;
  let userInstance: User;
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
          User.setConnection(connection);
          done();
        })
        .catch(done);
  });
  it('should get a user', done => {
    User.findById('102')
        .then(user => {
          expect(user).to.be.instanceOf(User)
          done();
        })
        .catch(done);
  })
  it('should get many user', done => {
    User.find()
        .then(user => {
          assert.lengthOf(user.models, 50);
          done();
        })
        .catch(done);
  })
})
