/**
 * The OauthConnection Class is injected with Oauth and Request there are Mocking Classes available in this project for mocking these libraries
 * In Production you would provide this class with node-auth and request by npm installing them into your project
 * ### Example
 * 
 * let connection = new OauthConnection(new OAuth(...), request, host, username, key)
 * 
 * connection.connect()
 * .then(payload => {
 *  if (payload.connected) console.log('connected to scouts');
 * })
 */
import {Error400, Error404, Error500, CustomError} from './errors';
export interface OauthConnectionOption {
    username: string
    password: string
    auth_access_token?: string
    auth_access_secret?: string
}
export class OauthConnection {
    private access_token: string;
    private access_secret: string;
    constructor (public oauth: any, public req: any, public host, public username?: string, public password?: string) {
    }
    connect ():Promise<{connected: boolean}> {
        return new Promise ((resolve, reject) => {
            this.request()
                .then(payload => (
                    this.authorise(payload)
                ))
                .then(payload => (
                    this.access(payload)
                ))
                .then((payload: any) => {
                    this.setTokenAndSecret(payload);
                    resolve({connected: true});
                })
                .catch(err => {
                    reject(new Error('Failed to Connect' + err));
                })
            })
    }
    get isAuthorised () {
        return Boolean(this.access_token && this.access_secret);
    }
    get (url:string):Promise<{data:any, res:any}> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
            this.oauth.get(this.host + url, this.access_token, this.access_secret, (err, data, res) => {
                if (err) return reject(this._errorHandler(err));
                resolve({data: JSON.parse(data), res});
            })
        }) 
    }
     post (url:string, body: any, post_content_type?: string):Promise<{data:any, res:any}> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
            this.oauth.post(this.host + url, this.access_token, this.access_secret, body, post_content_type, (err, data, res) => {
                if (err) return reject(this._errorHandler(err));
                resolve({data: JSON.parse(data), res});
            })
        })    
    }
    // post (url:string, body: any, post_content_type?: string):Promise<{data:any, res:any}> {
    //     return new Promise((resolve, reject) => {
    //         if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
    //         let req = {
    //             url: this.host + url,
    //             oauth: {
    //                 consumer_key: process.env.KEY,
    //                 consumer_secret: process.env.SECRET,
    //                 token: this.access_token,
    //                 token_secret: this.access_secret
    //             },
    //             formData: body
    //         }
    //         this.req.post(req, (err, data, res) => {
    //             if (err) return reject(this._errorHandler(err));
    //             resolve({ data, res});
    //         })
    //     })    
    // }
    put (url:string, body: any, post_content_type?: string):Promise<{data:any, res:any}> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
            this.oauth.put(this.host + url, this.access_token, this.access_secret, body, post_content_type, (err, data, res) => {
                if (err) return reject(this._errorHandler(err));
                resolve({data: JSON.parse(data), res});
            })
        })
    }
     delete (url:string):Promise<{data:any, res:any}> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
            this.oauth.delete(this.host + url, this.access_token, this.access_secret, (err, data, res) => {
                if (err) return reject(this._errorHandler(err));
                resolve({data: JSON.parse(data), res});
            })
        })
    }
    private authorise (payload:any) {
        let jar = this.req.jar()
        let request = this.req.defaults({jar: jar})
        return new Promise((resolve, reject) => {
            request.post(this.host + `modal_forms/ajax/login?destination=/oauth/authorize&oauth_token=${payload.token}`, { form: {
                    'form_id':'user_login',
                    'name': this.username,
                    'op':'Log in',
                    'pass': this.password,
            }}, (err, res, body) => {
                if (err) return reject(new CustomError({
                            status: err.statusCode,
                            message: 'Custom Login Failed'
                    }));
                request.post(`${this.host}oauth/authorize?oauth_token=${payload.token}`, {form: {
                    "form_id": "oauth_common_form_authorize_override",
                    "levels[default]": 1,
                    "op": "Grant access"
                }}, (err, res2, body) => {
                    if (err) return reject(new CustomError({
                            status: err.statusCode,
                            message: 'Custom Authorize Token Failed'
                    }));
                    resolve(payload);
                });
            })
        })
    }
    request ():Promise<{token:string, secret:string}> {
        return new Promise((resolve, reject) => {
            this.oauth.getOAuthRequestToken((err, token, secret) => {
                if (err) return reject(new CustomError({
                    status: err.statusCode,
                    message: 'Getting OAuth Request Token Failed'
                }));
                resolve({ token, secret })
            })
        })
    }
    access (payload):Promise<{access_token:string, access_secret:string}> {
        return new Promise((resolve, reject) => {
            this.oauth.getOAuthAccessToken(payload.token, payload.secret, (err, access_token, access_secret) => {
                if (err) {
                    this._customLoginError(payload);
                        reject(new CustomError({
                            status: err.statusCode,
                            message: 'Getting OAuth Access Token Failed'
                    }));
                }
                resolve({ access_token, access_secret });
            })
        }) 
    }
    private _customLoginError (payload:{token:string, secret:string}) {
           console.log(`Navigate to this and authorise:\n${process.env.HOST}oauth/authorize?oauth_token=${payload.token}`);
    }
    private _errorHandler (err) {
        switch (err.statusCode) {
            case 404:
                return new Error404({
                    body: err,
                    lib: 'Scouts API'
                });
            case 406:
                return new Error400({
                    body: err,
                    lib: 'Scouts API'
                })
            default :
                return new Error500({
                    body: err,
                    status: err.statusCode,
                    lib: 'Scouts API'
                })
        }
    }
    private setTokenAndSecret (payload) {
        const {access_token, access_secret} = payload;
        this.access_token = access_token;
        this.access_secret= access_secret;
    }
}
