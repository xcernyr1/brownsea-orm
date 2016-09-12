import { configurePassport } from './passport-boot-script';
import { createOauthRoutes } from './create-oauth-routes'; 
export function bootPassportMock (app, accessToken, user, identity, credential) {
    let config = {
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
    configurePassport(app, accessToken, user, identity, credential, config);
    createOauthRoutes(app);
}