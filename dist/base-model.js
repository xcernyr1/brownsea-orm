"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class BaseModels {
    constructor(models, count) {
        this.models = models;
        this.count = count;
    }
}
exports.BaseModels = BaseModels;
class BaseModel {
    constructor(instance) {
        this.instance = instance;
    }
    static setConnection(connection) {
        this.connection = connection;
    }
    static findById(id, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.getOne(`/api/${this.modelName}/${id}`, query)
                .then(payload => { return new this.Model(payload.data); });
        });
    }
    static find(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.get(`/api/${this.modelName}`, query)
                .then(payload => new BaseModels(payload.data.map(model => new this.Model(model)), payload.count));
        });
    }
    update(body) {
        Object.assign({}, body, { uid: this.instance.uid });
        return BaseModel.connection
            .patch(`/api/${this.modelName}/${this.instance.uid}`, body)
            .then(payload => {
            Object.assign(this.instance, body);
            return Promise.resolve(this.instance);
        });
    }
    static findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.find(query);
            if (result.count < this.MAX_INSTANCES_RETURNED)
                return result;
            let cache = [...result.models];
            let rounded = this.floor(result.count);
            let queries = [];
            for (let page = 2; page <= rounded; page++) {
                let _query = Object.assign({}, query, { page: { number: page } });
                queries.push(this.find(_query));
            }
            let results = yield Promise.all(queries);
            let reduced = results.map(a => a.models).reduce((a, b) => a.concat(b), cache);
            return new BaseModels(reduced, result.count);
        });
    }
    static floor(count) {
        let rounded = Math.floor(count / this.MAX_INSTANCES_RETURNED);
        return rounded;
    }
}
BaseModel.MAX_INSTANCES_RETURNED = 50;
exports.BaseModel = BaseModel;
//# sourceMappingURL=base-model.js.map