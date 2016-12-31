import {expect} from 'chai';
import * as dotenv from 'dotenv';

import {MockOauth} from './mock-oauth';
import {mockRequest} from './mock-request';
import {OauthConnection} from './oauth-connection';
import {User} from './user-model';

dotenv.config({silent: true});

describe('Connector For Scouts Oauth Implementation', () => {
  let connection: OauthConnection;
  before((done) => {
    connection = new OauthConnection(
        new MockOauth(
            'fake.net/oauth/request_token', 'fake.net/oauth/access_token',
            'TOKEN', 'SECRET'),
        mockRequest, 'fake.net');
    connection.connect()
        .then(connect => {
          User.setConnection(connection);
          done()
        })
        .catch(done);

  });
  it('should get a user',
     (done) => { User.findById('1').then(user => { done(); }).catch(done); })
})
