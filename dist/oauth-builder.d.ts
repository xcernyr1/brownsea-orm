import { OauthConnection } from './oauth-connection';
export declare const REQUEST_TOKEN: string;
export declare const ACCESS_TOKEN: string;
export declare const AUTHORIZE: string;
export declare const SIGNATURE_METHOD: string;
export declare const scoutsOauthBuilder: (OAuth: any, request: any, options: {
    username: string;
    password: string;
    key: string;
    secret: string;
    host: string;
}) => OauthConnection;
