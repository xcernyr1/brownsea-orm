/**
 * Tests The Scouts Endpoints in current api docs in the Google Drive named API
 * consumer - documentation
 */

import {assert, expect} from 'chai';
import * as dotenv from 'dotenv';
import * as request from 'request';
import {isNumber} from 'util';

import {scoutsOauthBuilder} from './oauth-builder';
import {OauthConnection} from './oauth-connection';
interface TestsArray {
  endpoints?: string[];
  description: string;
  tests: Test[]
}
interface Test {
  payload?: any;
  result?: any
}
var OAuth = require('oauth').OAuth2;
dotenv.config({silent: true});
describe('Scouts Staging Server Test', function() {
  let connection: OauthConnection;
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
          done();
        })
        .catch(done);
  });
  it('should connect', done => {
    expect(connection.isAuthorised).to.be.true;
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
          expect(payload.data).to.not.be.empty;
          done();
        })
        .catch(done);
  });
  it('User: test get current user relevant to access token', done => {
    connection.get('/api/current-user')
        .then(payload => {
          expect(payload.data).to.not.be.empty;
          done();
        })
        .catch(done);
  });
  describe('Create Project', function() {
    it('should get a great', () => {
      return connection
          .post('/api/v1/project', {
            'title': 'Year end Planning 2017',
            'description': 'How to plan this year.',
            'pictures': [],
            'language': 'en',
            'from_date': '2017-01-20',
            'to_date': '2017-02-02',
            'categories': 'Dialogue, Health',
            'service_hours': 24,
            'participants': 1000
          })
          .then((result) => {return result});
    })
    it.skip('should create a great image', () => {
      return connection
          .post('/api/v1/project-file-upload', {
            'file-name-1': request(
                'http://www.wkhscounselors.com/images/Pictures/ArticlePics/CollegeCareer/-testing.jpg')
          })
          .then(
              (result) => {// console.log('--------------file---------------');
                           // console.log(JSON.stringify(result, null, 2));
                           // console.log('--------------file---------------');
                           return result});
    })
  })
  describe('PAGINATION', () => {

    let userTests: TestsArray[] = [{
      endpoints: ['/api/user', '/api/term'],
      description: 'to ensure that pagination is working',
      tests: [
        {payload: {query: {page: {number: 5, size: 10}}}, result: {length: 10}},
        {payload: {query: {page: {number: 1, size: 20}}}, result: {length: 20}},
        {payload: {query: {page: {number: 1, size: 40}}}, result: {length: 40}},
      ]
    }

    ];
    userTests.forEach((test) => {
      test.endpoints.forEach(endpoint => {
        describe(`testing endpoint ${endpoint} ${test.description}`, () => {
          test.tests.forEach((_test) => {
            it(`tests that page[size] ${
                                        _test.payload.query.page.size
                                      } and page[number] ${_test.payload.query.page.number}`,
               (done) => {
                 connection.get(endpoint, _test.payload.query)
                     .then(payload => {
                       expect(payload.data).to.not.be.empty;
                       if (isNumber(_test.result.length))
                         assert.lengthOf(payload.data, _test.result.length);
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

    let userTests: TestsArray[] = [
      {
        endpoints: ['/api/user'],
        description: 'to ensure that filter is working',
        tests: [
          {
            payload: {query: {filter: {name: 'socialfunding'}, page: {number: 1, size: 10}}},
            result: {length: 1}
          },
          {
            payload: {query: {filter: {country: '84'}, page: {number: 1, size: 10}}},
            result: {length: 10}
          },
          {
            payload: {query: {filter: {firstName: 'John'}, page: {number: 1, size: 40}}},
            result: {length: 40}
          },
        ]
      },
      {
        endpoints: ['/api/term'],
        description: 'to ensure that filter is working',
        tests: [
          {
            payload: {query: {filter: {name: 'Australia'}, page: {number: 5, size: 10}}},
            result: {length: 1}
          },
          {payload: {query: {filter: {vid: 1}, page: {number: 1, size: 20}}}, result: {length: 20}},
          {payload: {query: {filter: {id: 1}, page: {number: 1, size: 40}}}, result: {length: 1}},
        ]
      }

    ];
    userTests.forEach((test) => {
      test.endpoints.forEach(endpoint => {
        describe.skip(`testing endpoint ${endpoint} ${test.description}`, () => {
          test.tests.forEach((_test: any) => {
            it(`tests that filter[${Object.keys(_test.payload.query.filter)[0]}] works `,
               (done) => {
                 connection.get(endpoint, _test.payload.query)
                     .then(payload => {
                       expect(payload.data).to.not.be.empty;
                       if (isNumber(_test.result.length))
                         assert.lengthOf(payload.data, _test.result.length);
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
