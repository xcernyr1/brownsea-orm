import {ScoutQuery} from './';
import {BaseModel} from './base-model';
/**
 * ### Example
 *
 * let connection = new OauthConnection(oauth:Oauth, request:Request,
 * host:strng, key:string, secret:string)
 *
 * Topic.setConnection(connection)
 *
 * Topic.get('1')
 * .then(Topic => {
 *      Topic.update({})
 * })
 *
 */
import {OauthConnection} from './oauth-connection';

export class Term extends BaseModel {
  static modelName = 'term';
  static Model = Term;
  static connection: OauthConnection;
  static tags(query: ScoutQuery = {}) { return this.getByVid(1, query); }
  static categories(query: ScoutQuery = {}) { return this.getByVid(2, query); }
  static question_categories(query: ScoutQuery = {}) {
    return this.getByVid(3, query);
  }
  static organization(query: ScoutQuery = {}) {
    return this.getByVid(4, query);
  }
  static topics_news(query: ScoutQuery = {}) { return this.getByVid(7, query); }
  static topics_events(query: ScoutQuery = {}) {
    return this.getByVid(8, query);
  }
  static countries(query: ScoutQuery = {}) { return this.getByVid(9, query); }
  static languages(query: ScoutQuery = {}) { return this.getByVid(10, query); }
  static topics_tutorials(query: ScoutQuery = {}) {
    return this.getByVid(11, query);
  }
  static scouting_interests(query: ScoutQuery = {}) {
    return this.getByVid(12, query);
  }
  static associations(query: ScoutQuery = {}) {
    return this.getByVid(21, query);
  }
  static getByVid(vid: number, query: ScoutQuery = {}) {
    let _query = Object.assign(
        {}, query, {filter: Object.assign(query.filter || {}, {vid})});
    return this.find(_query);
  }
  constructor(topic: any) { super(topic); }
}