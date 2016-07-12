import * as dotenv from 'dotenv';
import { expect } from 'chai';
import { OauthConnection } from './oauth-connection';
import { MockOauth } from './mock-oauth';
import { mockRequest} from './mock-request';

dotenv.config({silent: true});

describe('Connector For Scouts Oauth Implementation', () => {
    let connection: OauthConnection;
    before(() => {
       connection = new OauthConnection(new MockOauth('fake.net/oauth/request_token', 'fake.net/oauth/access_token', 'TOKEN', 'SECRET'), mockRequest, 'fake.net');
    });
    it('Request a Token for Authorisation', (done) => {
        connection.connect()
        .then((connection) => {
            expect(connection.connected).to.be.true;
            done();
        })
        .catch(done)
    });
    it('Request a Request Token for Authorisation', (done) => {
        connection.request()
        .then((payload) => {
            expect(payload).to.haveOwnProperty('token').haveOwnProperty('secret');
            done();
        })
        .catch(done)
    });
    it('Request Access Token for Authorisation', (done) => {
        connection.access({token: 'REQUESTTOKEN', secret: 'REQUESTTOKENSECRET'})
        .then((payload) => {
            expect(connection.isAuthorised).to.be.true
            done();
        })
        .catch(done)
    });
    it('.get request', (done) => {
        connection.get('url')
        .then(payload => {
            expect(payload).to.not.be.undefined;
            done();
        })
        .catch(done);
    });
    it('.put request', (done) => {
        connection.put('url', {name: 'nextfaze'})
        .then(payload => {
            expect(payload.data).to.haveOwnProperty('name', 'nextfaze' );
            done();
        })
        .catch(done);
    });
    it('.post request', (done) => {
        connection.post('url', {name: 'nextfaze'})
        .then(payload => {
            expect(payload.data).to.haveOwnProperty('name', 'nextfaze' );
            done();
        })
        .catch(done);
    });
})
