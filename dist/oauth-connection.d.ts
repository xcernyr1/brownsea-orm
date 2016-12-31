export interface OauthConnectionOption {
    username: string;
    password: string;
    auth_access_token?: string;
    auth_refresh_token?: string;
}
export interface ScoutQuery {
    filter?: {
        [k: string]: string;
    };
    page?: {
        size?: number;
        number?: number;
    };
    sort?: string;
}
export declare class OauthConnection {
    oauth: any;
    req: any;
    host: any;
    username: string;
    password: string;
    private access_token;
    private refresh_token;
    defaults: {
        headers: {
            'User-Agent': string;
        };
    };
    constructor(oauth: any, req: any, host: any, username?: string, password?: string);
    connect(): Promise<{
        connected: boolean;
    }>;
    readonly isAuthorised: boolean;
    get(url: string, query?: ScoutQuery): Promise<any>;
    getOne(url: string, query?: ScoutQuery): Promise<any>;
    post(url: string, body?: any, query?: ScoutQuery): Promise<any>;
    patch(url: string, body?: any, query?: ScoutQuery): Promise<any>;
    _request(method: string, url: string, body?: any, query?: ScoutQuery, many?: boolean): Promise<{}>;
    authorise(payload?: any): Promise<any>;
    request(): Promise<{}>;
    private _customLoginError(payload);
    private bodyMapper(payload, many);
    private _errorHandler(err);
    private setTokenAndSecret(payload);
}
