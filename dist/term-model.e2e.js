"use strict";
const chai_1 = require('chai');
const dotenv = require('dotenv');
const request = require('request');
const oauth_builder_1 = require('./oauth-builder');
const term_model_1 = require('./term-model');
dotenv.config({ silent: true });
var OAuth = require('oauth').OAuth2;
describe('Topics model should return topics', function () {
    this.timeout(30000);
    let connection;
    let topic;
    before(function (done) {
        this.timeout(30000);
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, {
            key: process.env.KEY,
            secret: process.env.SECRET,
            username: process.env.USERNAME,
            password: process.env.PASS,
            host: process.env.HOST
        });
        connection.connect()
            .then(() => {
            term_model_1.Term.setConnection(connection);
            done();
        })
            .catch(done);
    });
    it('should get a topic', done => {
        term_model_1.Term.findById('102')
            .then(_topic => {
            chai_1.expect(_topic).to.be.instanceOf(term_model_1.Term);
            done();
        })
            .catch(done);
    });
    it('should get many topics', done => {
        term_model_1.Term.find()
            .then(_terms => {
            chai_1.assert.lengthOf(_terms, 50);
            done();
        })
            .catch(done);
    });
    it('should get many tags', done => {
        term_model_1.Term.tags()
            .then(_tags => {
            chai_1.expect(_tags.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many topics', done => {
        term_model_1.Term.categories()
            .then(_cats => {
            chai_1.expect(_cats.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many question_categories', done => {
        term_model_1.Term.question_categories()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many organization', done => {
        term_model_1.Term.organization({}, true)
            .then(_terms => {
            debugger;
            chai_1.assert.lengthOf(_terms.models, _terms.count);
            done();
        })
            .catch(done);
    });
    it('should get many topics_news', done => {
        term_model_1.Term.topics_news()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many topics_events', done => {
        term_model_1.Term.topics_events()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many countries', done => {
        term_model_1.Term.countries()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many languages', done => {
        term_model_1.Term.languages()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many topics_tutorials', done => {
        term_model_1.Term.topics_tutorials()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many associations', done => {
        term_model_1.Term.scouting_interests()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many scouting_interests', done => {
        term_model_1.Term.associations()
            .then(_terms => {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=term-model.e2e.js.map