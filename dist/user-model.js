"use strict";
var User = (function () {
    function User(user) {
        this.user = user;
    }
    User.setConnection = function (connection) {
        this.connection = connection;
    };
    User.get = function (id) {
        return this.connection.get("profile/user/" + id + ".json").then(function (payload) {
            return Promise.resolve(new User(payload.data));
        });
    };
    User.login = function (payload) {
        return this.connection.post("profile/user/login.json", payload);
    };
    User.prototype.update = function (body) {
        var _this = this;
        Object.assign({}, body, {
            uid: this.user.uid
        });
        return User.connection.put("profile/user/" + this.user.uid, body)
            .then(function (payload) {
            Object.assign(_this.user, body);
            return Promise.resolve(_this.user);
        });
    };
    User.prototype.destroy = function () {
        var _this = this;
        return User.connection.delete("profile/user/" + this.user.uid)
            .then(function (dat) {
            return Promise.resolve({ deleted: true, user: _this.user });
        });
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user-model.js.map