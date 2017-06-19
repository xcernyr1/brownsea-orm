import {expect} from 'chai';

import {MockOauth} from './mock-oauth'

describe('MockOauth', function() {
  let oauth;
  before(() => {
    oauth = new MockOauth('', '', '', '', '', '', '');
  })
  it('.getOAuthRequestToken', (done) => {oauth.getOAuthRequestToken((e, token, secret) => {
                                expect(token).to.equal('REQUESTTOKEN');
                                expect(secret).to.equal('REQUESTTOKENSECRET');
                                done();
                              })})
  it('.getOAuthAccesToken',
     (done) => {
         oauth.getOAuthAccessToken('REQUESTTOKEN', 'REQUESTTOKENSECRET', (err, token, secret) => {
           expect(token).to.equal('OAUTHACCESSTOKEN');
           expect(secret).to.equal('OAUTHACCESSTOKENSECRET');
           done();
         })})
  it('._perfomSecureRequest',
     (done) => {oauth._perfomSecureRequest(
         'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', 'GET', 'http://fake.com/profile/node/1.json',
         undefined, undefined, undefined, (err, data, res) => {
           expect(err).not.to.exist;
           expect(data).to.be.string;
           expect(res).to.be.empty;
           done();
         })})
  it('.get',
     (done) => {oauth.get(
         'http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET',
         (err, data, res) => {
           expect(err).not.to.exist;
           expect(data).to.be.string;
           expect(res).to.be.empty;
           done();
         })})
  it('.delete',
     (done) => {oauth.get(
         'http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET',
         (err, data, res) => {
           expect(err).not.to.exist;
           expect(data).to.be.string;
           expect(res).to.be.empty;
           done();
         })})
  it('.post',
     (done) => {oauth.post(
         'http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {},
         'application/json', (err, data, res) => {
           expect(err).not.to.exist;
           expect(data).to.be.string;
           expect(res).to.be.empty;
           done();
         })})
  it('.put',
     (done) => {oauth.put(
         'http://fake.com/profile/node/1.json', 'OAUTHACCESSTOKEN', 'OAUTHACCESSTOKENSECRET', {},
         'application/json', (err, data, res) => {
           expect(err).not.to.exist;
           expect(data).to.be.string;
           expect(res).to.be.empty;
           done();
         })})
})