
import {assert, expect} from 'chai';
import * as dotenv from 'dotenv';
import * as request from 'request';

import {MockOauth} from './mock-oauth';
import {mockRequest} from './mock-request';
import {scoutsOauthBuilder} from './oauth-builder';
import {OauthConnection} from './oauth-connection';
import {Term} from './term-model';

dotenv.config({silent: true});
var OAuth = require('oauth').OAuth2;


describe('Topics model should return topics', function() {
  let connection: OauthConnection;
  let topic: Term;
  before(function(done) {
    connection = scoutsOauthBuilder(OAuth, request, {
      key: process.env.KEY,
      secret: process.env.SECRET,
      username: process.env.USERNAME,
      password: process.env.PASS,
      host: process.env.HOST
    });
    connection.connect()
        .then(() => {
          Term.setConnection(connection);
          done();
        })
        .catch(done);
  });
  it('should get a topic', done => {
    Term.findById('102')
        .then(_topic => {
          expect(_topic).to.be.instanceOf(Term)
          done();
        })
        .catch(done);
  })
  it('should get many topics', done => {
    Term.find()
        .then((_terms: any) => {
          assert.lengthOf(_terms, 50);
          done();
        })
        .catch(done);
  })
  it('should get many tags', done => {
    Term.tags()
        .then(_tags => {
          expect(_tags.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many topics', done => {
    Term.categories()
        .then(_cats => {
          expect(_cats.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  })

  it('should get many question_categories', done => {
    Term.question_categories()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many organization', done => {
    Term.organization({}, true)
        .then(_terms => {
          debugger
          assert.lengthOf(_terms.models, _terms.count);
          done();
        })
        .catch(done);
  });
  it('should get many topics_news', done => {
    Term.topics_news()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many topics_events', done => {
    Term.topics_events()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many countries', done => {
    Term.countries()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many languages', done => {
    Term.languages()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many topics_tutorials', done => {
    Term.topics_tutorials()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many associations', done => {
    Term.scouting_interests()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
  it('should get many scouting_interests', done => {
    Term.associations()
        .then(_terms => {
          expect(_terms.models.length > 1).to.be.true;
          done();
        })
        .catch(done);
  });
})
