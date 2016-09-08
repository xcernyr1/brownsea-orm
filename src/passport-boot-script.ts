var loopbackPassport = require('loopback-component-passport');
var ensureLoggedIn = require('connect-ensure-login');
import { createRoutes } from './create-routes';
export function configurePassport (app, accessToken, user, identity, credential, config) {
    var PassportConfigurator = loopbackPassport.PassportConfigurator;
    var passportConfigurator = new PassportConfigurator(app);

    passportConfigurator.init();

    passportConfigurator.setupModels({
      userModel: user,
      userIdentityModel: identity,
      userCredentialModel: credential
    });
  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }
  createRoutes(app);
}