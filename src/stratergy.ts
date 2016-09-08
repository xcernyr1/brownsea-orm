var util = require('util')
var Strategy = require('passport-strategy');

function MockStrategy (options, verify) {
    this._verify = verify;
    Strategy.call(this);
}

util.inherits(MockStrategy, Strategy);

MockStrategy.prototype.authenticate = function(req, options) {
    var self = this;
    debugger
    let a = self._verify.length;
    function verified(err, user, info) {
              if (err) { return self.error(err); }
              if (!user) { return self.fail(info); }
              
              info = info || {};
              self.success(user, info);
            }
    this._verify(req, 'token', 'tokenSecret', {
        provider: 'drupal',
        id: '1',
        displayName: 'Paul Robinson',
        emails: [{value: 'email@email.com'}],
        profileURL: 'user.json',
        name: {
          familyName: 'Robinson',
          givenName: 'Paul'
        }
      }, verified);
}
MockStrategy.prototype.userProfile = function(token, tokenSecret, params, done) {
    debugger
    done(null, {displayName: 'Paul Robinson', email: 'email@email.com'})
}

module.exports = MockStrategy;