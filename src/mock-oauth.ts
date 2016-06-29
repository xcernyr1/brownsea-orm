import { parse } from 'url';
export class MockOauth {
    private requestToken:string;
    private requestTokenSecret: string;
    private oauthAccessToken: string;
    private oAuthAccessTokenSecret: string;
    constructor (reqEnd:string, accEnd:string, key:string, secret:string, version:any, callbackUrl:string, signatureMethod:string) {
        this.requestToken = 'REQUESTTOKEN';
        this.requestTokenSecret = 'REQUESTTOKENSECRET';
        this.oauthAccessToken = 'OAUTHACCESSTOKEN';
        this.oAuthAccessTokenSecret = 'OAUTHACCESSTOKENSECRET';
    }
    getOAuthRequestToken (cb) {
        cb(null, this.requestToken, this.requestTokenSecret, {statusCode: 200});
    }
    getOAuthAccessToken (token:string, secret:string, cb:Function) {
        if (token === this.requestToken && secret === this.requestTokenSecret) return cb(null, this.oauthAccessToken, this.oAuthAccessTokenSecret);
        return cb({statusCode: 401, data: 'Token Not Found'});
    }
    _perfomSecureRequest (oauth_token:string, oauth_token_secret:string, method:string, url:string, extra_params:any, post_body:any, post_content_type:any,  cb:Function) {
        let urlParts = parse(url, true);
        let query = urlParts.query;
        debugger
        if (query.oauth_token === this.oauthAccessToken && oauth_token_secret === this.oAuthAccessTokenSecret) return cb(null, {});
        return cb(new Error());
        
    }
    get (url:string, oauth_token:string, oauth_token_secret:string, cb:Function) {
        this._perfomSecureRequest(oauth_token, oauth_token_secret, 'GET', url, undefined, undefined, undefined, cb);
    } 
}