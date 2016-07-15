/**
 * Tests The Scouts Endpoints in current api docs in the Google Drive named API consumer - documentation
 */

import  * as dotenv from  'dotenv';
import { expect } from  'chai';
import { scoutsOauthBuilder } from './oauth-builder';
import { OauthConnection } from './oauth-connection';
import  * as request from  'request';
var OAuth = require('oauth').OAuth;
dotenv.config({ silent: true });
describe('Scouts Staging Server Test', function () {
    let connection:OauthConnection;
    before(function (done) {
        this.timeout(30000);
        connection = scoutsOauthBuilder(OAuth, request, { key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST });
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
    describe('System', () => {
        it('System: connect POST /profile/system/connect.json', done => {
            connection.post('profile/system/connect.json', {})
                .then(payload => {
                expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(done);
        });
    })
    describe('User', () => {
        let uid;
        it('register POST /profile/user/register.json', done => {
            connection.post('profile/user/register.json', {
                'name': 'services_user_paul2',
                'pass[pass1]': 'password',
                'pass[pass2]': 'password',
                'field_first_name[und][0][value]': 'Paul',
                'field_last_name[und][0][value]': 'Robinson',
                'field_user_country[und]': 84,
                'terms': 1,
                'op': 'Create new account',
                'timezone' : '',
                'mail': 'services_user_paul2@example.com',
            }, 'multipart/form-data')
                .then(payload => {
                let a = payload.data;
                uid = a.uid;
                expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(err => {
                    debugger
                    console.log(err);
                    done();
                });
        });
        it(`retrieve GET /profile/user/1.json`, done => {
            connection.get(`profile/user/1.json`)
                .then(payload => {
                expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(done);
        });
        it(`update PUT /profile/user/1.json`, done => {
            connection.put(`profile/user/1.json`, {
                'name': 'services_user_paul',
            })
                .then(payload => {
                let a = payload.data;
                expect(a).to.not.be.empty;
                done();
            })
                .catch(done);
        });
        it('login POST profile/user/login.json', done => {
            connection.post('profile/user/login.json', {
                'username': process.env.USERNAME,
                'password': process.env.PASS
            }).then(payload => {
                expect(payload.data).to.not.be.empty;
                done()
            }).catch(done)
        })
        it('logout POST profile/user/logout.json', done => {
            connection.post('profile/user/logout.json', {
                'username': process.env.USERNAME,
                'password': process.env.PASS
            }).then(payload => {
                expect(payload.data).to.not.be.empty;
                done()
            }).catch(done)
        })
        it(`delete DELETE /profile/user/${uid}.json`, done => {
            connection.delete(`profile/user/${uid}.json`)
                .then(payload => {
                expect(payload.data).to.not.be.empty;
                done()
            })
                .catch(done);
        });
    });
    describe(`Node`, () => {
        let nid: string;
        it(`create /profile/node/create.json`, done => {
            connection.post(`profile/node/create.json`, {
                "type":"article",
                "title":"Article submitted via JSON REST",
                "body":{
                    "und":[
                        {
                            "value":"This is the body of the article."
                        }
                    ]
                }
            }).then((payload) => {
                nid = payload.data.nid;
                expect(payload.data).to.not.be.empty;
            })
            .catch(done)
        })
        it(`retrieve GET /profile/node/${nid}.json`, done => {
            connection.get(`profile/node/${nid}.json`)
            .then(payload => {
                expect(payload.data).to.not.be.empty;
                done();
            })
            .catch(done);
        })
        it(`update PUT /profile/node/${nid}.json`, done => {
            connection.put(`profile/node/${nid}.json`,  {
                "type":"article",
                "title":"Article submitted via JSON REST",
                "body":{
                    "und":[
                        {
                            "value":"This is the updated body of the article."
                        }
                    ]
                }
            }).then(payload => {
                expect(payload.data).to.not.be.empty;
                done()
            })
            .catch(done)
        })
    })
    describe(`Taxonomy`, () => {
        let vid: string;
        describe('vocabulary', () => {
            it('create POST /profile/taxonomy_vocabulary/create.json', done => {
                connection.post('profile/taxonomy_vocabulary/create.json', {
                    'name': 'My custom vocabulary',
                    'description': 'This vocabulary has a special purpose',
                    'machine_name': 'my_custom_vocab',
                })
                    .then(payload => {
                    vid = payload.data.vid;
                    expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it(`retrieve GET /profile/taxonomy_vocabulary/${vid}.json`, done => {
                connection.get(`profile/taxonomy_vocabulary/${vid}.json`)
                    .then(payload => {
                        expect(payload.data).to.not.be.empty;
                        done();
                })
                    .catch(done);
            });
            it(`update PUT /profile/taxonomy_vocabulary/${vid}.json`, done => {
                connection.put(`profile/taxonomy_vocabulary/${vid}.json`, {
                    'name' : 'My updated custom vocabulary',
                    'description' : 'This vocabulary has a special updated purpose',
                })
                .then(payload => {
                    expect(payload.data).to.exist;
                    done();
                })
                .catch(done);
            });
        });
        describe('term', () => {
            let tid: string;
            it('create POST /profile/taxonomy_term/create.json', done => {
                connection.post('profile/taxonomy_term/create.json', {
                    'vid': vid,
                    'name': 'My xxxxxx Tag',
                    'description': 'Term description',
                    'vocabulary_machine_name': 'tags'
                })
                    .then(payload => {
                    expect(payload.data).to.not.be.empty;
                    tid = payload.data.tid;
                    done();
                })
                    .catch(done);
            });
            it(`retrieve GET /profile/taxonomy_term/${tid}.json`, done => {
                connection.get(`profile/taxonomy_term/${tid}.json`)
                    .then(payload => {
                    expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it('update PUT /profile/taxonomy_term/update.json', done => {
                connection.post('profile/taxonomy_term/update.json', {
                    'vid': vid,
                    'name': 'My updated xxxxxx Tag',
                    'description': 'Updated Term description'
                })
                    .then(payload => {
                    expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it(`selectNodes Post /profile/taxonomy_term/selectNodes.json`, done => {
                connection.post(`profile/taxonomy_term/selectNodes.json`, {
                    tid
                })
                    .then(payload => {
                    expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it(`selectNodes Post /profile/taxonomy_term/getTree.json`, done => {
                connection.post(`profile/taxonomy_term/getTree.json`, {
                    vid
                })
                    .then(payload => {
                    expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
        });
    });
});
