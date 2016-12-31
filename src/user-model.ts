import {ScoutQuery} from './';
import {BaseModel} from './base-model';
/**
 * ### Example
 *
 * let connection = new OauthConnection(oauth:Oauth, request:Request,
 * host:strng, key:string, secret:string)
 *
 * User.setConnection(connection)
 *
 * User.get('1')
 * .then(user => {
 *      user.update({})
 * })
 *
 */
import {OauthConnection} from './oauth-connection';

export class User extends BaseModel {
  static modelName = 'user';
  static Model = User;
  static connection: OauthConnection;
  constructor(user: any) { super(user); }
}