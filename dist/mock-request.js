"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRequest = {
    post: function (url, opts, cb) {
        cb(null, null, null);
    },
    get: function (url, cb) {
        cb(null, null, null);
    },
    defaults: function () {
        return this;
    },
    jar: function () {
        return _this;
    }
};
//# sourceMappingURL=mock-request.js.map