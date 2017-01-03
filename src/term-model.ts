import {ScoutQuery} from './';
import {BaseModel, BaseModels} from './base-model';
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
  static tags(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(1, query, all);
  }
  static categories(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(2, query, all);
  }
  static question_categories(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(3, query, all);
  }
  static organization(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(4, query, all);
  }
  static topics_news(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(7, query, all);
  }
  static topics_events(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(8, query, all);
  }
  static countries(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(9, query, all);
  }
  static languages(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(10, query, all);
  }
  static topics_tutorials(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(11, query, all);
  }
  static scouting_interests(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(12, query, all);
  }
  static associations(query: ScoutQuery = {}, all?: boolean) {
    return this.getByVid(21, query, all);
  }
  static getByVid(vid: number, query: ScoutQuery = {}, all: boolean = false):
      Promise<BaseModels> {
    if (!all)
      return this.find(this.assignVid(vid, query));
    else
      return this.findAll(this.assignVid(vid, query));
  }
  private static assignVid(vid: number, query: ScoutQuery = {}) {
    let _query = Object.assign(
        {}, query, {filter: Object.assign(query.filter || {}, {vid})});
    return _query;
  }
  constructor(topic: any) { super(topic); }
}