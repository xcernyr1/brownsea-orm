import { configurePassport } from './passport-boot-script';
export function bootPassportMock (app, accessToken, user, identity, credential) {
    let config = {
        "scout": {
            "strategy": "MockStrategy",
            "module": "./strategy",
            "resourceEndpoint": "profile/system/connect.json",
            "authPath": "/auth/local",
            "callbackPath": "/auth/scout/callback",
            "successRedirect": "/auth/account",
            "failureRedirect": "/login",
            "failureFlash": true,
            "scope": ["email"],
            "providerURL": "http://worldscoutstg.prod.acquia-sites.com",
            "consumerKey": "oSNcefTdBZzXuuWf9FfG6nJkraWxbf66",
            "consumerSecret": "iKkp2FKzHB7Vp4PzbtRNGGXgFtKGNPGs",
            "profileEmail": true,
            "userNameField": "displayName",
            "name": true
        }
    };
    configurePassport(app, accessToken, user, identity, credential, config)
}