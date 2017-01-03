import {OauthConnection, ScoutQuery} from './oauth-connection';

export class BaseModels {
  constructor(public models: any[], public count: number) {}
}

export class BaseModel {
  static MAX_INSTANCES_RETURNED: number = 50;
  static Model: any;
  static connection: OauthConnection;
  static modelName;
  static setConnection(connection: OauthConnection) {
    this.connection = connection;
  }
  static async findById(id: string, query: ScoutQuery = {}) {
    return this.connection.getOne(`/api/${this.modelName}/${id}`, query)
        .then(payload => { return new this.Model(payload.data); });
  }
  static async find(query: ScoutQuery = {}) {
    return this.connection.get(`/api/${this.modelName}`, query)
        .then(
            payload => new BaseModels(
                payload.data.map(model => new this.Model(model)),
                payload.count));
  }
  modelName: string;
  constructor(public instance: any) {}
  update(body: any) {
    Object.assign({}, body, {uid: this.instance.uid});
    return BaseModel.connection
        .patch(`/api/${this.modelName}/${this.instance.uid}`, body)
        .then(payload => {
          Object.assign(this.instance, body);
          return Promise.resolve(this.instance);
        });
  }
  static async findAll(query: ScoutQuery) {
    let result = await this.find(query);
    if (result.count < this.MAX_INSTANCES_RETURNED) return result;
    let cache = [...result.models];
    let rounded = this.floor(result.count);
    let queries = [];
    for (let page = 2; page <= rounded; page++) {
      let _query = Object.assign({}, query, {page: {number: page}});
      queries.push(this.find(_query))
    }
    let results = await Promise.all(queries);
    let reduced =
        results.map(a => a.models).reduce((a, b) => a.concat(b), cache);
    return new BaseModels(reduced, result.count);
  }
  private static floor(count: number) {
    let rounded = Math.floor(count / this.MAX_INSTANCES_RETURNED);
    return rounded;
  }
}
