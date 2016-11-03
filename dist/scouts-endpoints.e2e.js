"use strict";
var dotenv = require('dotenv');
var chai_1 = require('chai');
var oauth_builder_1 = require('./oauth-builder');
var request = require('request');
var OAuth = require('oauth').OAuth;
dotenv.config({ silent: true });
describe('Scouts Staging Server Test', function () {
    var connection;
    before(function (done) {
        this.timeout(30000);
        connection = oauth_builder_1.scoutsOauthBuilder(OAuth, request, { key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST });
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
    describe('System', function () {
        it('System: connect POST /profile/system/connect.json', function (done) {
            connection.post('profile/system/connect.json', {})
                .then(function (payload) {
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(done);
        });
    });
    describe('User', function () {
        var uid;
        it('register POST /profile/user/register.json', function (done) {
            connection.post('profile/user/register.json', {
                'name': 'services_user_paul2',
                'pass[pass1]': 'password',
                'pass[pass2]': 'password',
                'field_first_name[und][0][value]': 'Paul',
                'field_last_name[und][0][value]': 'Robinson',
                'field_user_country[und]': 84,
                'terms': 1,
                'op': 'Create new account',
                'timezone': '',
                'mail': 'services_user_paul2@example.com',
            }, 'multipart/form-data')
                .then(function (payload) {
                var a = payload.data;
                uid = a.uid;
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(function (err) {
                debugger;
                console.log(err);
                done();
            });
        });
        it("retrieve GET /profile/user/1.json", function (done) {
            connection.get("profile/user/1.json")
                .then(function (payload) {
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(done);
        });
        it("update PUT /profile/user/1.json", function (done) {
            connection.put("profile/user/1.json", {
                'name': 'services_user_paul',
            })
                .then(function (payload) {
                var a = payload.data;
                chai_1.expect(a).to.not.be.empty;
                done();
            })
                .catch(done);
        });
        it('login POST profile/user/login.json', function (done) {
            connection.post('profile/user/login.json', {
                'username': process.env.USERNAME,
                'password': process.env.PASS
            }).then(function (payload) {
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            }).catch(done);
        });
        it('logout POST profile/user/logout.json', function (done) {
            connection.post('profile/user/logout.json', {
                'username': process.env.USERNAME,
                'password': process.env.PASS
            }).then(function (payload) {
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            }).catch(done);
        });
        it("delete DELETE /profile/user/" + uid + ".json", function (done) {
            connection.delete("profile/user/" + uid + ".json")
                .then(function (payload) {
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(done);
        });
    });
    describe("Node", function () {
        var nid;
        it("create /profile/node/create.json", function (done) {
            connection.post("profile/node/create.json", {
                "type": "article",
                "title": "Article submitted via JSON REST",
                "body": {
                    "und": [
                        {
                            "value": "This is the body of the article."
                        }
                    ]
                }
            }).then(function (payload) {
                nid = payload.data.nid;
                chai_1.expect(payload.data).to.not.be.empty;
            })
                .catch(done);
        });
        it("retrieve GET /profile/node/" + nid + ".json", function (done) {
            connection.get("profile/node/" + nid + ".json")
                .then(function (payload) {
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(done);
        });
        it("update PUT /profile/node/" + nid + ".json", function (done) {
            connection.put("profile/node/" + nid + ".json", {
                "type": "article",
                "title": "Article submitted via JSON REST",
                "body": {
                    "und": [
                        {
                            "value": "This is the updated body of the article."
                        }
                    ]
                }
            }).then(function (payload) {
                chai_1.expect(payload.data).to.not.be.empty;
                done();
            })
                .catch(done);
        });
    });
    describe("Taxonomy", function () {
        var vid;
        describe('vocabulary', function () {
            it('create POST /profile/taxonomy_vocabulary/create.json', function (done) {
                connection.post('profile/taxonomy_vocabulary/create.json', {
                    'name': 'My custom vocabulary',
                    'description': 'This vocabulary has a special purpose',
                    'machine_name': 'my_custom_vocab',
                })
                    .then(function (payload) {
                    vid = payload.data.vid;
                    chai_1.expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it("retrieve GET /profile/taxonomy_vocabulary/" + vid + ".json", function (done) {
                connection.get("profile/taxonomy_vocabulary/" + vid + ".json")
                    .then(function (payload) {
                    chai_1.expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it("update PUT /profile/taxonomy_vocabulary/" + vid + ".json", function (done) {
                connection.put("profile/taxonomy_vocabulary/" + vid + ".json", {
                    'name': 'My updated custom vocabulary',
                    'description': 'This vocabulary has a special updated purpose',
                })
                    .then(function (payload) {
                    chai_1.expect(payload.data).to.exist;
                    done();
                })
                    .catch(done);
            });
        });
        describe('term', function () {
            var tid;
            it('create POST /profile/taxonomy_term/create.json', function (done) {
                connection.post('profile/taxonomy_term/create.json', {
                    'vid': vid,
                    'name': 'My xxxxxx Tag',
                    'description': 'Term description',
                    'vocabulary_machine_name': 'tags'
                })
                    .then(function (payload) {
                    chai_1.expect(payload.data).to.not.be.empty;
                    tid = payload.data.tid;
                    done();
                })
                    .catch(done);
            });
            it("retrieve GET /profile/taxonomy_term/" + tid + ".json", function (done) {
                connection.get("profile/taxonomy_term/" + tid + ".json")
                    .then(function (payload) {
                    chai_1.expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it('update PUT /profile/taxonomy_term/update.json', function (done) {
                connection.post('profile/taxonomy_term/update.json', {
                    'vid': vid,
                    'name': 'My updated xxxxxx Tag',
                    'description': 'Updated Term description'
                })
                    .then(function (payload) {
                    chai_1.expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it("selectNodes Post /profile/taxonomy_term/selectNodes.json", function (done) {
                connection.post("profile/taxonomy_term/selectNodes.json", {
                    tid: tid
                })
                    .then(function (payload) {
                    chai_1.expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
            it("selectNodes Post /profile/taxonomy_term/getTree.json", function (done) {
                connection.post("profile/taxonomy_term/getTree.json", {
                    vid: vid
                })
                    .then(function (payload) {
                    chai_1.expect(payload.data).to.not.be.empty;
                    done();
                })
                    .catch(done);
            });
        });
    });
});
//# sourceMappingURL=scouts-endpoints.e2e.js.map