import {OauthConnection} from './oauth-connection';

export class BaseModel {
  static Model: any;
  static connection: OauthConnection;
  static modelName;
  static setConnection(connection: OauthConnection) {
    this.connection = connection;
  }
  static async findById(id: string, query: any = {}) {
    return this.connection.getOne(`/api/${this.modelName}/${id}`, query)
        .then(payload => { return new this.Model(payload.data); });
  }
  static async find(query: any = {}) {
    return this.connection.get(`/api/${this.modelName}`, query)
        .then(payload => payload.data.map(model => new this.Model(model)));
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
}