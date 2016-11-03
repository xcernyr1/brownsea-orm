export declare class MockOauth {
    private requestToken;
    private requestTokenSecret;
    private oauthAccessToken;
    private oAuthAccessTokenSecret;
    constructor(reqEnd: string, accEnd: string, key: string, secret: string, version?: any, callbackUrl?: string, signatureMethod?: string);
    getOAuthRequestToken(cb: any): void;
    getOAuthAccessToken(token: string, secret: string, cb: Function): any;
    _perfomSecureRequest(oauth_token: string, oauth_token_secret: string, method: string, url: string, extra_params: any, post_body: any, post_content_type: any, cb: Function): any;
    get(url: string, oauth_token: string, oauth_token_secret: string, cb: Function): void;
    delete(url: string, oauth_token: string, oauth_token_secret: string, cb: Function): void;
    put(url: string, oauth_token: string, oauth_token_secret: string, post_body: any, post_content_type: string, cb: Function): void;
    post(url: string, oauth_token: string, oauth_token_secret: string, post_body: any, post_content_type: string, cb: Function): void;
}
