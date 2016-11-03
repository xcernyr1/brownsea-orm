"use strict";
var loopbackPassport = require('loopback-component-passport');
var ensureLoggedIn = require('connect-ensure-login');
var create_routes_1 = require('./create-routes');
function configurePassport(app, accessToken, user, identity, credential, config) {
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
    create_routes_1.createRoutes(app);
}
exports.configurePassport = configurePassport;
//# sourceMappingURL=passport-boot-script.js.map