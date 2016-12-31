"use strict";
class CustomError extends Error {
    constructor(options = {}) {
        const { status, message, lib, body } = options;
        super(message);
        this.status = status;
        this.lib = lib;
        this.body = body;
    }
}
exports.CustomError = CustomError;
class Error500 extends CustomError {
    constructor(body = {}) {
        let options = Object.assign({}, {
            status: 500,
            message: `Unknown Server Error`
        }, body);
        super(options);
    }
}
exports.Error500 = Error500;
class Error404 extends CustomError {
    constructor(body = {}) {
        let options = Object.assign({}, {
            status: 404,
            message: `Resource Not Found`
        }, body);
        super(options);
    }
}
exports.Error404 = Error404;
class Error400 extends CustomError {
    constructor(body = {}) {
        let options = Object.assign({}, {
            status: 400,
            message: `Validation Errors`
        }, body);
        super(options);
    }
}
exports.Error400 = Error400;
//# sourceMappingURL=errors.js.map