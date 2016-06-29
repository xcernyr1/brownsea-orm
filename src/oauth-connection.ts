const HOST = 'http://worldscoutstg.prod.acquia-sites.com/';
const REQUEST_TOKEN = 'oauth/request_token';
const ACCESS_TOKEN = 'oauth/access_token';
const AUTHORIZE = 'oauth/authorize';
const SIGNATURE_METHOD = 'HMAC-SHA1';
export class OauthConnection {
    constructor (public oauth: any, key:string, secret:string, callbackUrl:string) {
    }
}