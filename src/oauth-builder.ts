/**
 * scoutsOauthBuilder allows you to build your connection by passing all
 * required dependecies returning a new connection for you to connect with
 */
import {OauthConnection} from './oauth-connection';

export const REQUEST_TOKEN = '/oauth2/token';
export const ACCESS_TOKEN = '/oauth2/token';
export const AUTHORIZE = '/oauth2/authorize';

export const scoutsOauthBuilder = (OAuth: any, request: any, options: {
  username: string,
  password: string,
  key: string,
  secret: string,
  host: string
}) => {
  let oauth = OAuth(
      options.key, options.secret, options.host, AUTHORIZE, REQUEST_TOKEN);
  return new OauthConnection(
      oauth, request, options.host, options.username, options.password);
}