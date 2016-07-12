export class OauthConnection {
    private access_token: string;
    private access_secret: string;
    constructor (public oauth: any, public req: any, public host, public username?: string, public password?: string) {}
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
                if (err) return reject(new Error(JSON.stringify(err)));
                resolve({data, res});
            })
        }) 
    }
     post (url:string, body: any, post_content_type?: string):Promise<{data:any, res:any}> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
            this.oauth.post(this.host + url, this.access_token, this.access_secret, body, post_content_type, (err, data, res) => {
                if (err) return reject(new Error(JSON.stringify(err)));
                resolve({data, res});
            })
        })    
    }
    put (url:string, body: any, post_content_type?: string):Promise<{data:any, res:any}> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
            this.oauth.put(this.host + url, this.access_token, this.access_secret, body, post_content_type, (err, data, res) => {
                if (err) return reject(new Error(JSON.stringify(err)));
                resolve({data, res});
            })
        })
    }
     delete (url:string):Promise<{data:any, res:any}> {
        return new Promise((resolve, reject) => {
            if (!this.isAuthorised) console.warn('It appears that access_token || access_secret are not set');
            this.oauth.delete(this.host + url, this.access_token, this.access_secret, (err, data, res) => {
                if (err) return reject(new Error(JSON.stringify(err)));
                resolve({data, res});
            })
        })
    }
    private authorise (payload:any) {
        let request = this.req.defaults({jar: true})
        return new Promise((resolve, reject) => {
            request.post(this.host + 'login', { form: {
                    'form_id':'user_login',
                    'name': this.username,
                    'op':'Log in',
                    'pass': this.password,
            }}, (err, res, body) => {
                if (err) return reject('Login Error' + new Error(JSON.stringify(err)));
                request.post(`${this.host}oauth/authorize?oauth_token=${payload.token}`, {form: {
                    "form_id": "oauth_common_form_authorize_override",
                    "levels[default]": 1,
                    "op": "Grant access"
                }}, (err, res2, body) => {
                    if (err) return reject(new Error('Authorise Error' + JSON.stringify(err)));
                    resolve(payload);
                });
            })
        })
    }
    request ():Promise<{token:string, secret:string}> {
        return new Promise((resolve, reject) => {
            this.oauth.getOAuthRequestToken((err, token, secret) => {
                if (err) return reject('Request Error' + new Error(JSON.stringify(err)));
                resolve({ token, secret })
            })
        })
    }
    access (payload):Promise<{access_token:string, access_secret:string}> {
        return new Promise((resolve, reject) => {
            this.oauth.getOAuthAccessToken(payload.token, payload.secret, (err, access_token, access_secret) => {
                if (err) return reject('Access Error' + new Error(JSON.stringify(err)));
                resolve({ access_token, access_secret });
            })
        }) 
    }
    private setTokenAndSecret (payload) {
        const {access_token, access_secret} = payload;
        this.access_token = access_token;
        this.access_secret= access_secret;
    }
}
