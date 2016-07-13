import { scoutsOauthBuilder } from './oauth-builder';
import * as dotenv from 'dotenv';
import * as request from 'request';

var OAuth = require('oauth').OAuth;

dotenv.config({silent: true});

export * from './oauth-connection';
// if (process.env.REQUEST) {
//  let connection  = scoutsOauthBuilder(OAuth, request, {key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST});
//     connection.request()
//     .then(payload => {
//         console.log(payload);
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
// if (process.env.ACCESS) {
//  let connection  = scoutsOauthBuilder(OAuth, request, {key: process.env.KEY, secret: process.env.SECRET, username: process.env.USERNAME, password: process.env.PASS, host: process.env.HOST});
//     connection.access({token: process.env.REQUEST_TOKEN, secret:process.env.REQUEST_SECRET})
//     .then(payload => {
//         console.log(payload);
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }