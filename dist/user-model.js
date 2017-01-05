"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_model_1 = require("./base-model");
var User = (function (_super) {
    __extends(User, _super);
    function User(user) {
        return _super.call(this, user) || this;
    }
    return User;
}(base_model_1.BaseModel));
User.modelName = 'user';
User.Model = User;
exports.User = User;
//# sourceMappingURL=user-model.js.map