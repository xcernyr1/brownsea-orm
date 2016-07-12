import { OauthConnection } from './oauth-connection';

const REQUEST_TOKEN = 'oauth/request_token';
const ACCESS_TOKEN = 'oauth/access_token';
const AUTHORIZE = 'oauth/authorize';
const SIGNATURE_METHOD = 'HMAC-SHA1';

export const scoutsOauthBuilder = (OAuth: any, request:any, options: {username: string, password: string, key: string, secret:string, host:string}) => {
    let oauth = new OAuth(`${options.host + REQUEST_TOKEN}`, `${options.host + ACCESS_TOKEN}`, options.key, options.secret, null, 'http://probinson.com', SIGNATURE_METHOD)
    return new OauthConnection(oauth, request, options.host, options.username, options.password);
}