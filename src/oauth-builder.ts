import { OauthConnection } from './oauth-connection';

const HOST = 'http://worldscoutstg.prod.acquia-sites.com/';
const REQUEST_TOKEN = 'oauth/request_token';
const ACCESS_TOKEN = 'oauth/access_token';
const AUTHORIZE = 'oauth/authorize';
const SIGNATURE_METHOD = 'HMAC-SHA1';

export const scoutsOauthBuilder = (OAuth: any, request:any, key: string, secret: string, access_token?: string, access_secret?: string) => {
    let oauth = new OAuth(`${HOST + REQUEST_TOKEN}`, `${HOST + ACCESS_TOKEN}`, key, secret, null, 'http://probinson.com', SIGNATURE_METHOD)
    return new OauthConnection(oauth, request, HOST, access_token, access_secret);
}