"use strict";
var create_routes_1 = require("./create-routes");
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var ensureLoggedIn = require('connect-ensure-login');
function configurePassport(app, accessToken, user, identity, credential, config) {
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
        create_routes_1.createRoutes(app, c.options);
    }
}
exports.configurePassport = configurePassport;
//# sourceMappingURL=passport-boot-script.js.map