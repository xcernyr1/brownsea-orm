"use strict";
const base_model_1 = require('./base-model');
class Term extends base_model_1.BaseModel {
    constructor(topic) {
        super(topic);
    }
    static tags(query = {}, all) {
        return this.getByVid(1, query, all);
    }
    static categories(query = {}, all) {
        return this.getByVid(2, query, all);
    }
    static question_categories(query = {}, all) {
        return this.getByVid(3, query, all);
    }
    static organization(query = {}, all) {
        return this.getByVid(4, query, all);
    }
    static topics_news(query = {}, all) {
        return this.getByVid(7, query, all);
    }
    static topics_events(query = {}, all) {
        return this.getByVid(8, query, all);
    }
    static countries(query = {}, all) {
        return this.getByVid(9, query, all);
    }
    static languages(query = {}, all) {
        return this.getByVid(10, query, all);
    }
    static topics_tutorials(query = {}, all) {
        return this.getByVid(11, query, all);
    }
    static scouting_interests(query = {}, all) {
        return this.getByVid(12, query, all);
    }
    static associations(query = {}, all) {
        return this.getByVid(21, query, all);
    }
    static getByVid(vid, query = {}, all = false) {
        if (!all)
            return this.find(this.assignVid(vid, query));
        else
            return this.findAll(this.assignVid(vid, query));
    }
    static assignVid(vid, query = {}) {
        let _query = Object.assign({}, query, { filter: Object.assign(query.filter || {}, { vid }) });
        return _query;
    }
}
Term.modelName = 'term';
Term.Model = Term;
exports.Term = Term;
//# sourceMappingURL=term-model.js.map