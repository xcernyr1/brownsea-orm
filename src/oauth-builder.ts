/**
 * scoutsOauthBuilder allows you to build your connection by passing all required dependecies returning a new connection for you to connect with
 */
import { OauthConnection } from './oauth-connection';

export const REQUEST_TOKEN = 'oauth/request_token';
export const ACCESS_TOKEN = 'oauth/access_token';
export const AUTHORIZE = 'oauth/authorize';
export const SIGNATURE_METHOD = 'HMAC-SHA1';

export const scoutsOauthBuilder = (OAuth: any, request:any, options: {username: string, password: string, key: string, secret:string, host:string}) => {
    let oauth = new OAuth(`${options.host + REQUEST_TOKEN}`, `${options.host + ACCESS_TOKEN}`, options.key, options.secret, null, 'https://nextfaze.com', SIGNATURE_METHOD)
    return new OauthConnection(oauth, request, options.host, options.username, options.password);
}