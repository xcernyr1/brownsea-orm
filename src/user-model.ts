/**
 * ### Example
 *  
 * let connection = new OauthConnection(oauth:Oauth, request:Request, host:strng, key:string, secret:string)
 * 
 * User.setConnection(connection)
 * 
 * User.get('1')
 * .then(user => {
 *      user.update({})
 * })
 * 
 */
import { OauthConnection } from './oauth-connection';

export class User {
    static connection: OauthConnection
    static setConnection (connection:OauthConnection) {
        this.connection = connection;
    }
    static get (id:string) {
        return this.connection.get(`profile/user/${id}.json`).then(payload => {
            return Promise.resolve(new User(payload.data));
        })
    }
    static login (payload: {username: string, password: string}) {
        return this.connection.post(`profile/user/login.json`, payload)
    }
    constructor (public user:any) {}
    update (body:any) {
        Object.assign({}, body, {
            uid: this.user.uid
        })
        return User.connection.put(`profile/user/${this.user.uid}`, body)
                .then(payload => {
                    Object.assign(this.user, body);
                    return Promise.resolve(this.user);
                });
    }
    destroy () {
        return User.connection.delete(`profile/user/${this.user.uid}`)
        .then(dat => {
            return Promise.resolve({deleted: true, user: this.user});
        });
    }
}