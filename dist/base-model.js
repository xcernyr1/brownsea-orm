"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModels = (function () {
    function BaseModels(models, count) {
        this.models = models;
        this.count = count;
    }
    return BaseModels;
}());
exports.BaseModels = BaseModels;
var BaseModel = (function () {
    function BaseModel(instance) {
        this.instance = instance;
    }
    BaseModel.setConnection = function (connection) {
        this.connection = connection;
    };
    BaseModel.findById = function (id, query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this.connection.getOne("/api/" + this.modelName + "/" + id, query)
                        .then(function (payload) { return new _this.Model(payload.data); })];
            });
        });
    };
    BaseModel.find = function (query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, this.connection.get("/api/" + this.modelName, query)
                        .then(function (payload) { return new BaseModels(payload.data.map(function (model) { return new _this.Model(model); }), payload.count); })];
            });
        });
    };
    BaseModel.prototype.update = function (body) {
        var _this = this;
        Object.assign({}, body, { uid: this.instance.uid });
        return BaseModel.connection
            .patch("/api/" + this.modelName + "/" + this.instance.uid, body)
            .then(function (payload) {
            Object.assign(_this.instance, body);
            return Promise.resolve(_this.instance);
        });
    };
    BaseModel.findAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, cache, rounded, queries, page, _query, results, reduced;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.find(query)];
                    case 1:
                        result = _a.sent();
                        if (result.count < this.MAX_INSTANCES_RETURNED)
                            return [2, result];
                        cache = result.models.slice();
                        rounded = this.ceil(result.count);
                        queries = [];
                        for (page = 2; page <= rounded; page++) {
                            _query = Object.assign({}, query, { page: { number: page } });
                            queries.push(this.find(_query));
                        }
                        return [4, Promise.all(queries)];
                    case 2:
                        results = _a.sent();
                        reduced = results.map(function (a) { return a.models; }).reduce(function (a, b) { return a.concat(b); }, cache);
                        return [2, new BaseModels(reduced, result.count)];
                }
            });
        });
    };
    BaseModel.ceil = function (count) {
        var rounded = Math.ceil(count / this.MAX_INSTANCES_RETURNED);
        return rounded;
    };
    BaseModel.MAX_INSTANCES_RETURNED = 50;
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=base-model.js.map