"use strict";
var passport_boot_script_1 = require('./passport-boot-script');
var create_oauth_routes_1 = require('./create-oauth-routes');
function bootPassportMock(app, accessToken, user, identity, credential) {
    var config = {
        "scout": {
            "strategy": "DrupalStrategy",
            "module": "passport-drupal",
            "resourceEndpoint": "profile/system/connect.json",
            "authPath": "/auth/local",
            "callbackPath": "/oauth/mock/authorize",
            "successRedirect": "/auth/account",
            "failureRedirect": "/login",
            "failureFlash": true,
            "scope": ["email"],
            "providerURL": "http://0.0.0.0:3000",
            "consumerKey": "oSNcefTdBZzXuuWf9FfG6nJkraWxbf66",
            "consumerSecret": "iKkp2FKzHB7Vp4PzbtRNGGXgFtKGNPGs",
            "profileEmail": true,
            "userNameField": "displayName",
            "name": true
        }
    };
    passport_boot_script_1.configurePassport(app, accessToken, user, identity, credential, config);
    create_oauth_routes_1.createOauthRoutes(app);
}
exports.bootPassportMock = bootPassportMock;
//# sourceMappingURL=passport-boot-mock.js.map