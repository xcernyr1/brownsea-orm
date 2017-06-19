"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var dotenv = require("dotenv");
var request = require("request");
var oauth_builder_1 = require("./oauth-builder");
var term_model_1 = require("./term-model");
dotenv.config({ silent: true });
var OAuth = require('oauth').OAuth2;
describe('Topics model should return topics', function () {
    var connection;
    var topic;
    before(function (done) {
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, {
            key: process.env.KEY,
            secret: process.env.SECRET,
            username: process.env.USERNAME,
            password: process.env.PASS,
            host: process.env.HOST
        });
        connection.connect()
            .then(function () {
            term_model_1.Term.setConnection(connection);
            done();
        })
            .catch(done);
    });
    it('should get a topic', function (done) {
        term_model_1.Term.findById('102')
            .then(function (_topic) {
            chai_1.expect(_topic).to.be.instanceOf(term_model_1.Term);
            done();
        })
            .catch(done);
    });
    it('should get many topics', function (done) {
        term_model_1.Term.find()
            .then(function (_terms) {
            chai_1.assert.lengthOf(_terms, 50);
            done();
        })
            .catch(done);
    });
    it('should get many tags', function (done) {
        term_model_1.Term.tags()
            .then(function (_tags) {
            chai_1.expect(_tags.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many topics', function (done) {
        term_model_1.Term.categories()
            .then(function (_cats) {
            chai_1.expect(_cats.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many question_categories', function (done) {
        term_model_1.Term.question_categories()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many organization', function (done) {
        term_model_1.Term.organization({}, true)
            .then(function (_terms) {
            debugger;
            chai_1.assert.lengthOf(_terms.models, _terms.count);
            done();
        })
            .catch(done);
    });
    it('should get many topics_news', function (done) {
        term_model_1.Term.topics_news()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many topics_events', function (done) {
        term_model_1.Term.topics_events()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many countries', function (done) {
        term_model_1.Term.countries()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many languages', function (done) {
        term_model_1.Term.languages()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many topics_tutorials', function (done) {
        term_model_1.Term.topics_tutorials()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many associations', function (done) {
        term_model_1.Term.scouting_interests()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
    it('should get many scouting_interests', function (done) {
        term_model_1.Term.associations()
            .then(function (_terms) {
            chai_1.expect(_terms.models.length > 1).to.be.true;
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=term-model.e2e.js.map