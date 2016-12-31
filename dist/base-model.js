"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
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
                .then(payload => payload.data.map(model => new this.Model(model)));
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
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=base-model.js.map