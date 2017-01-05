import { OauthConnection } from './oauth-connection';
export declare const REQUEST_TOKEN = "/oauth2/token";
export declare const ACCESS_TOKEN = "/oauth2/token";
export declare const AUTHORIZE = "/oauth2/authorize";
export declare const scoutsOauthBuilder: (OAuth: any, request: any, options: {
    username: string;
    password: string;
    key: string;
    secret: string;
    host: string;
}) => OauthConnection;
