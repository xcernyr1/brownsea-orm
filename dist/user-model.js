"use strict";
const base_model_1 = require('./base-model');
class User extends base_model_1.BaseModel {
    constructor(user) {
        super(user);
    }
}
User.modelName = 'user';
User.Model = User;
exports.User = User;
//# sourceMappingURL=user-model.js.map