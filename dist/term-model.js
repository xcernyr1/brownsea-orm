"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_model_1 = require("./base-model");
var Term = (function (_super) {
    __extends(Term, _super);
    function Term(topic) {
        return _super.call(this, topic) || this;
    }
    Term.tags = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(1, query, all);
    };
    Term.categories = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(2, query, all);
    };
    Term.question_categories = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(3, query, all);
    };
    Term.organization = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(4, query, all);
    };
    Term.topics_news = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(7, query, all);
    };
    Term.topics_events = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(8, query, all);
    };
    Term.countries = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(9, query, all);
    };
    Term.languages = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(10, query, all);
    };
    Term.topics_tutorials = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(11, query, all);
    };
    Term.scouting_interests = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(12, query, all);
    };
    Term.associations = function (query, all) {
        if (query === void 0) { query = {}; }
        return this.getByVid(21, query, all);
    };
    Term.getByVid = function (vid, query, all) {
        if (query === void 0) { query = {}; }
        if (all === void 0) { all = false; }
        if (!all)
            return this.find(this.assignVid(vid, query));
        else
            return this.findAll(this.assignVid(vid, query));
    };
    Term.assignVid = function (vid, query) {
        if (query === void 0) { query = {}; }
        var _query = Object.assign({}, query, { filter: Object.assign(query.filter || {}, { vid: vid }) });
        return _query;
    };
    return Term;
}(base_model_1.BaseModel));
Term.modelName = 'term';
Term.Model = Term;
exports.Term = Term;
//# sourceMappingURL=term-model.js.map