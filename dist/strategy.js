var util = require('util');
var Strategy = require('passport-strategy');
var OAuth2Strategy = require('passport-oauth2');
function MockStrategy(options, verify) {
    this._verify = verify;
    Strategy.call(this);
}
function ScoutStrategy(options, verify) {
    this._resource = options.resource;
    this._whoamiURL = options.whoamiURL || '/api/current-user';
    this._profileURL = options.profileURL;
    this._verify = verify;
    OAuth2Strategy.call(this, options, verify);
}
util.inherits(MockStrategy, Strategy);
util.inherits(ScoutStrategy, OAuth2Strategy);
ScoutStrategy.prototype.userProfile = function (accessToken, done) {
    var _this = this;
    this._oauth2.get("" + this._resource + this._whoamiURL, accessToken, function (err, body, other) {
        if (err)
            return done(err);
        try {
            var json = JSON.parse(body);
            var id = json.data[0].uid;
        }
        catch (err) {
            return done(err);
        }
        _this._oauth2.get("" + _this._resource + _this._profileURL + "/" + id, accessToken, function (err, body, other) {
            if (err)
                return done(err);
            try {
                var json = JSON.parse(body);
                var id = json.data[0].id + '';
                var user = json.data[0];
                var profile = {
                    _json: json.data[0],
                    _raw: body,
                    provider: 'scout',
                    id: id,
                    username: user.username || user.name,
                    profileImage: user.profileImage,
                    name: { givenName: user.firstName, lastName: user.lastName },
                    country: user.country,
                    organisation: user.organisation,
                    emails: [{ value: user.email }],
                    profileURL: user.self
                };
                return done(null, profile);
            }
            catch (err) {
                return done(err);
            }
        });
    });
};
MockStrategy.prototype.authenticate = function (req, options) {
    var self = this;
    var a = self._verify.length;
    function verified(err, user, info) {
        if (err) {
            return self.error(err);
        }
        if (!user) {
            return self.fail(info);
        }
        info = info || {};
        self.success(user, info);
    }
    this._verify(req, 'token', 'tokenSecret', {
        provider: 'drupal',
        id: '1',
        displayName: 'Paul Robinson',
        emails: [{ value: 'email@email.com' }],
        profileURL: 'user.json',
        name: { familyName: 'Robinson', givenName: 'Paul' }
    }, verified);
};
MockStrategy.prototype.userProfile = function (token, tokenSecret, params, done) {
    done(null, { displayName: 'Paul Robinson', email: 'email@email.com' });
};
module.exports.MockStrategy = MockStrategy;
module.exports.ScoutStrategy = ScoutStrategy;
//# sourceMappingURL=strategy.js.map