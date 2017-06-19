"use strict";
var chai_1 = require("chai");
var dotenv = require("dotenv");
var request = require("request");
var util_1 = require("util");
var oauth_builder_1 = require("./oauth-builder");
var OAuth = require('oauth').OAuth2;
dotenv.config({ silent: true });
describe('Scouts Staging Server Test', function () {
    var connection;
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
            done();
        })
            .catch(done);
    });
    it('should connect', function (done) {
        chai_1.expect(connection.isAuthorised).to.be.true;
        done();
    });
    it('User: simple registration POST /user-registration', function (done) {
        connection
            .post('/api/user-registration', {
            name: 'My Name',
            email: Date.now() + '@email.com',
            pass: 'password',
            first_name: 'Alex',
            last_name: 'De La Mancha',
            country: 'Spain'
        })
            .then(function (payload) {
            chai_1.expect(payload.data).to.not.be.empty;
            done();
        })
            .catch(done);
    });
    it('User: test get current user relevant to access token', function (done) {
        connection.get('/api/current-user')
            .then(function (payload) {
            chai_1.expect(payload.data).to.not.be.empty;
            done();
        })
            .catch(done);
    });
    describe('Create Project', function () {
        it('should get a great', function () {
            return connection
                .post('/api/v1/project', {
                'title': 'Year end Planning 2017',
                'description': 'How to plan this year.',
                'pictures': [1148796],
                'language': 'en',
                'from_date': '2017-01-20',
                'to_date': '2017-02-02',
                'categories': 'Dialogue, Health',
                'service_hours': 24,
                'participants': 1000
            })
                .then(function (result) { return result; });
        });
        it.skip('should create a great image', function () {
            return connection
                .post('/api/v1/project-file-upload', {
                'file-name-1': request('http://www.wkhscounselors.com/images/Pictures/ArticlePics/CollegeCareer/-testing.jpg')
            })
                .then(function (result) {
                return result;
            });
        });
    });
    describe('PAGINATION', function () {
        var userTests = [{
                endpoints: ['/api/user', '/api/term'],
                description: 'to ensure that pagination is working',
                tests: [
                    { payload: { query: { page: { number: 5, size: 10 } } }, result: { length: 10 } },
                    { payload: { query: { page: { number: 1, size: 20 } } }, result: { length: 20 } },
                    { payload: { query: { page: { number: 1, size: 40 } } }, result: { length: 40 } },
                ]
            }
        ];
        userTests.forEach(function (test) {
            test.endpoints.forEach(function (endpoint) {
                describe("testing endpoint " + endpoint + " " + test.description, function () {
                    test.tests.forEach(function (_test) {
                        it("tests that page[size] " + _test.payload.query.page.size + " and page[number] " + _test.payload.query.page.number, function (done) {
                            connection.get(endpoint, _test.payload.query)
                                .then(function (payload) {
                                chai_1.expect(payload.data).to.not.be.empty;
                                if (util_1.isNumber(_test.result.length))
                                    chai_1.assert.lengthOf(payload.data, _test.result.length);
                                done();
                            })
                                .catch(done);
                        });
                    });
                });
            });
        });
    });
    describe('FILTER', function () {
        var userTests = [
            {
                endpoints: ['/api/user'],
                description: 'to ensure that filter is working',
                tests: [
                    {
                        payload: { query: { filter: { name: 'socialfunding' }, page: { number: 1, size: 10 } } },
                        result: { length: 1 }
                    },
                    {
                        payload: { query: { filter: { country: '84' }, page: { number: 1, size: 10 } } },
                        result: { length: 10 }
                    },
                    {
                        payload: { query: { filter: { firstName: 'John' }, page: { number: 1, size: 40 } } },
                        result: { length: 40 }
                    },
                ]
            },
            {
                endpoints: ['/api/term'],
                description: 'to ensure that filter is working',
                tests: [
                    {
                        payload: { query: { filter: { name: 'Australia' }, page: { number: 5, size: 10 } } },
                        result: { length: 1 }
                    },
                    { payload: { query: { filter: { vid: 1 }, page: { number: 1, size: 20 } } }, result: { length: 20 } },
                    { payload: { query: { filter: { id: 1 }, page: { number: 1, size: 40 } } }, result: { length: 1 } },
                ]
            }
        ];
        userTests.forEach(function (test) {
            test.endpoints.forEach(function (endpoint) {
                describe("testing endpoint " + endpoint + " " + test.description, function () {
                    test.tests.forEach(function (_test) {
                        it("tests that filter[" + Object.keys(_test.payload.query.filter)[0] + "] works ", function (done) {
                            connection.get(endpoint, _test.payload.query)
                                .then(function (payload) {
                                chai_1.expect(payload.data).to.not.be.empty;
                                if (util_1.isNumber(_test.result.length))
                                    chai_1.assert.lengthOf(payload.data, _test.result.length);
                                done();
                            })
                                .catch(done);
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=scouts-endpoints.e2e.js.map