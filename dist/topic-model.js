"use strict";
const base_model_1 = require('./base-model');
class Term extends base_model_1.BaseModel {
    constructor(topic) {
        super(topic);
    }
    static tags(query = {}) { return this.getByVid(1, query); }
    static categories(query = {}) { return this.getByVid(2, query); }
    static question_categories(query = {}) {
        return this.getByVid(3, query);
    }
    static organization(query = {}) {
        return this.getByVid(4, query);
    }
    static topics_news(query = {}) { return this.getByVid(7, query); }
    static topics_events(query = {}) {
        return this.getByVid(8, query);
    }
    static countries(query = {}) { return this.getByVid(9, query); }
    static languages(query = {}) { return this.getByVid(10, query); }
    static topics_tutorials(query = {}) {
        return this.getByVid(11, query);
    }
    static scouting_interests(query = {}) {
        return this.getByVid(12, query);
    }
    static associations(query = {}) {
        return this.getByVid(21, query);
    }
    static getByVid(vid, query = {}) {
        let _query = Object.assign({}, query, { filter: Object.assign(query.filter || {}, { vid }) });
        return this.find(_query);
    }
}
Term.modelName = 'term';
Term.Model = Term;
exports.Term = Term;
//# sourceMappingURL=topic-model.js.map