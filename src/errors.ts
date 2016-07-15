export interface ErrorOptions {
        lib?: string
        message?: string
        body?: any
        status?: number
}
export class CustomError extends Error {
    status: number;
    lib: string;
    body: any;
    constructor (options:ErrorOptions = {}) {
        const {status, message, lib, body} = options;
        super(message);
        this.status = status;
        this.lib = lib;
        this.body = body;
    }
}
export class Error500 extends CustomError {
    constructor (body: ErrorOptions = {}) {
        let options = Object.assign({}, {
            status: 500,
            message: `Unknown Server Error`
        }, body)
        super(options);
    }
}
export class Error404 extends CustomError {
    constructor (body: ErrorOptions = {}) {
        let options = Object.assign({}, {
            status: 404,
            message: `Resource Not Found`
        }, body)
        super(options);
    }
}
export class Error400 extends CustomError {
    constructor (body: ErrorOptions = {}) {
        let options = Object.assign({}, {
            status: 400,
            message: `Validation Errors`
        }, body)
        super(options);
    }
}