import { createRoutes } from './create-routes';
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var ensureLoggedIn = require('connect-ensure-login');
export function configurePassport(app, accessToken, user, identity, credential, config) {

  var passportConfigurator = new PassportConfigurator(app);

  passportConfigurator.init(false);

  passportConfigurator.setupModels({
    userModel: user,
    userIdentityModel: identity,
    userCredentialModel: credential
  });
  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
    createRoutes(app, c.options);
  }
}