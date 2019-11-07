export interface ErrorOptions {
    lib?: string;
    message?: string;
    body?: any;
    status?: number;
}
export declare class CustomError extends Error {
    status: number;
    lib: string;
    body: any;
    constructor(options?: ErrorOptions);
}
export declare class Error500 extends CustomError {
    constructor(body?: ErrorOptions);
}
export declare class Error404 extends CustomError {
    constructor(body?: ErrorOptions);
}
export declare class Error400 extends CustomError {
    constructor(body?: ErrorOptions);
}
