"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomError = (function (_super) {
    __extends(CustomError, _super);
    function CustomError(options) {
        if (options === void 0) { options = {}; }
        var status = options.status, message = options.message, lib = options.lib, body = options.body;
        _super.call(this, message);
        this.status = status;
        this.lib = lib;
        this.body = body;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var Error500 = (function (_super) {
    __extends(Error500, _super);
    function Error500(body) {
        if (body === void 0) { body = {}; }
        var options = Object.assign({}, {
            status: 500,
            message: "Unknown Server Error"
        }, body);
        _super.call(this, options);
    }
    return Error500;
}(CustomError));
exports.Error500 = Error500;
var Error404 = (function (_super) {
    __extends(Error404, _super);
    function Error404(body) {
        if (body === void 0) { body = {}; }
        var options = Object.assign({}, {
            status: 404,
            message: "Resource Not Found"
        }, body);
        _super.call(this, options);
    }
    return Error404;
}(CustomError));
exports.Error404 = Error404;
var Error400 = (function (_super) {
    __extends(Error400, _super);
    function Error400(body) {
        if (body === void 0) { body = {}; }
        var options = Object.assign({}, {
            status: 400,
            message: "Validation Errors"
        }, body);
        _super.call(this, options);
    }
    return Error400;
}(CustomError));
exports.Error400 = Error400;
//# sourceMappingURL=errors.js.map