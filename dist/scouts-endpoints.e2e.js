"use strict";
const chai_1 = require('chai');
const dotenv = require('dotenv');
const request = require('request');
const util_1 = require('util');
const oauth_builder_1 = require('./oauth-builder');
var OAuth = require('oauth').OAuth2;
dotenv.config({ silent: true });
describe('Scouts Staging Server Test', function () {
    let connection;
    before(function (done) {
        this.timeout(30000);
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, {
            key: process.env.KEY,
            secret: process.env.SECRET,
            username: process.env.USERNAME,
            password: process.env.PASS,
            host: process.env.HOST
        });
        connection.connect().then(() => { done(); }).catch(done);
    });
    it('should connect', done => {
        chai_1.expect(connection.isAuthorised).to.be.true;
        done();
    });
    it('User: simple registration POST /user-registration', done => {
        connection
            .post('/api/user-registration', {
            name: 'My Name',
            email: Date.now() + '@email.com',
            pass: 'password',
            first_name: 'Alex',
            last_name: 'De La Mancha',
            country: 'Spain'
        })
            .then(payload => {
            chai_1.expect(payload.data).to.not.be.empty;
            done();
        })
            .catch(done);
    });
    it('User: test get current user relevant to access token', done => {
        connection.get('/api/current-user')
            .then(payload => {
            chai_1.expect(payload.data).to.not.be.empty;
            done();
        })
            .catch(done);
    });
    describe('PAGINATION', () => {
        let userTests = [{
                endpoints: ['/api/user', '/api/term'],
                description: 'to ensure that pagination is working',
                tests: [
                    { payload: { query: { page: { number: 5, size: 10 } } }, result: { length: 10 } },
                    { payload: { query: { page: { number: 1, size: 20 } } }, result: { length: 20 } },
                    { payload: { query: { page: { number: 1, size: 40 } } }, result: { length: 40 } },
                ]
            }
        ];
        userTests.forEach((test) => {
            test.endpoints.forEach(endpoint => {
                describe(`testing endpoint ${endpoint} ${test.description}`, () => {
                    test.tests.forEach((_test) => {
                        it(`tests that page[size] ${_test.payload.query.page.size} and page[number] ${_test.payload.query.page.number}`, (done) => {
                            connection.get(endpoint, _test.payload.query)
                                .then(payload => {
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
    describe('FILTER', () => {
        let userTests = [
            {
                endpoints: ['/api/user'],
                description: 'to ensure that filter is working',
                tests: [
                    {
                        payload: {
                            query: {
                                filter: { name: 'socialfunding' },
                                page: { number: 1, size: 10 }
                            }
                        },
                        result: { length: 1 }
                    },
                    {
                        payload: { query: { filter: { country: '84' }, page: { number: 1, size: 10 } } },
                        result: { length: 10 }
                    },
                    {
                        payload: {
                            query: { filter: { firstName: 'John' }, page: { number: 1, size: 40 } }
                        },
                        result: { length: 40 }
                    },
                ]
            },
            {
                endpoints: ['/api/term'],
                description: 'to ensure that filter is working',
                tests: [
                    {
                        payload: {
                            query: { filter: { name: 'Australia' }, page: { number: 5, size: 10 } }
                        },
                        result: { length: 1 }
                    },
                    {
                        payload: { query: { filter: { vid: 1 }, page: { number: 1, size: 20 } } },
                        result: { length: 20 }
                    },
                    {
                        payload: { query: { filter: { id: 1 }, page: { number: 1, size: 40 } } },
                        result: { length: 1 }
                    },
                ]
            }
        ];
        userTests.forEach((test) => {
            test.endpoints.forEach(endpoint => {
                describe(`testing endpoint ${endpoint} ${test.description}`, () => {
                    test.tests.forEach((_test) => {
                        it(`tests that filter[${Object.keys(_test.payload.query.filter)[0]}] works `, (done) => {
                            connection.get(endpoint, _test.payload.query)
                                .then(payload => {
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