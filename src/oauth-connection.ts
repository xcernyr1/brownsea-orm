const Browser = require('zombie');
const browser = new Browser({waitDuration: 60 * 1000});
import {parse} from 'url';
import {stringify} from 'querystring';
/**
 * The OauthConnection Class is injected with Oauth and Request there are
 * Mocking Classes available in this project for mocking these libraries
 * In Production you would provide this class with node-auth and request by npm
 * installing them into your project
 * ### Example
 *
 * let connection = new OauthConnection(new OAuth(...), request, host, username,
 * key)
 *
 * connection.connect()
 * .then(payload => {
 *  if (payload.connected) console.log('connected to scouts');
 * })
 */
import {CustomError, Error400, Error404, Error500} from './errors';
export interface OauthConnectionOption {
  username: string;
  password: string;
  auth_access_token?: string;
  auth_refresh_token?: string;
}
export interface ScoutQuery {
  filter?: {[k: string]: string};
  page?: {size?: number, number?: number};
  sort?: string
}
export class OauthConnection {
  private access_token: string;
  private refresh_token: string;
  defaults = {
    headers: {'User-Agent': 'request'},
  };
  constructor(
      public oauth: any, public req: any, public host, public username?: string,
      public password?: string) {}
  async connect() {
    let request = await this.request();
    let authorise = await this.authorise(request);
    this.access_token = authorise.access_token;
    this.refresh_token = authorise.refresh_token
    //       .then(payload => (this.authorise(payload)))
    //       .then(payload => (this.access(payload)))
    //       .then((payload: any) => {
    //         this.setTokenAndSecret(payload);
    //         resolve({connected: true});
    //       })
    //       .catch(err => { reject(new Error('Failed to Connect' + err)); });
    // });
    return {connected: true};
  }
  get isAuthorised() {
    return Boolean(this.access_token && this.refresh_token);
  }
  async get(url: string, query?: ScoutQuery): Promise<any> {
    return this._request('get', url, null, query)
  }
  async getOne(url: string, query?: ScoutQuery): Promise<any> {
    return this._request('get', url, null, query, false);
  }
  async post(url: string, body: any = {}, query: ScoutQuery = {}):
      Promise<any> {
    return this._request('post', url, body, query)
  }

  async patch(url: string, body: any = {}, query: ScoutQuery = {}):
      Promise<any> {
    return this._request('patch', url, body, query)
  }
  async _request(
      method: string, url: string, body: any = {}, query: ScoutQuery = {},
      many = true) {
    let options = Object.assign(this.defaults, {
      method,
      form: body,
      url: this.host + url,
      qs: Object.assign(query || {}, {access_token: this.access_token})
    });
    return new Promise((resolve, reject) => {
      if (!this.isAuthorised)
        console.warn(
            'It appears that access_token || refresh_token are not set');
      this.req(options, (err, res, data) => {
        if (err) return reject(this._errorHandler(err));
        if (res.statusCode >= 401) return reject(new Error('Permission Denied'))
          resolve({data: this.bodyMapper(JSON.parse(data), many), res});
      });
    });
  }
  async authorise(payload: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthAccessToken(
          payload.code, {
            grant_type: 'authorization_code',
            redirect_uri: 'https://httpbin.org/get'
          },
          (err, access_token, refresh_token) => {
            if (err)
              reject(new CustomError({
                status: err.statusCode,
                message: 'Getting OAuth Request Token Failed'
              }));
            resolve({access_token, refresh_token});
          });
    })
  }
  async request() {
    let url = this.oauth.getAuthorizeUrl({
      client_secret: this.oauth._clientSecret,
      response_type: 'code',
      state: 'random1234',
      scope: 'api',
      redirect_uri: 'https://httpbin.org/get'
    });
    return new Promise((resolve, reject) => {browser.visit(url, () => {
                         browser.fill('name', this.username)
                             .fill('pass', this.password)
                             .pressButton('op', (err, res, body) => {
                               let query = parse(browser.location.href, true);
                               browser.deleteCookies();
                               return err ? reject(err) : resolve(query.query);
                             });
                       })})
  }
  private _customLoginError(payload: {token: string, secret: string}) {
    console.log(
        `Navigate to this and authorise:\n${process.env.HOST}oauth/authorize?oauth_token=${payload.token}`);
  }
  private bodyMapper(payload, many) {
    if (!payload || !payload.data) return many ? [] : {};
    return many ? payload.data : payload.data[0];
  }
  private _errorHandler(err) {
    switch (err.statusCode) {
      case 404:
        return new Error404({body: err, lib: 'Scouts API'});
      case 406:
        return new Error400({body: err, lib: 'Scouts API'});
      default:
        return new Error500(
            {body: err, status: err.statusCode, lib: 'Scouts API'});
    }
  }
  private setTokenAndSecret(payload) {
    const {access_token, refresh_token} = payload;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
