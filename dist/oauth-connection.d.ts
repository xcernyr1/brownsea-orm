export interface OauthConnectionOption {
    username: string;
    password: string;
    auth_access_token?: string;
    auth_access_secret?: string;
}
export declare class OauthConnection {
    oauth: any;
    req: any;
    host: any;
    username: string;
    password: string;
    private access_token;
    private access_secret;
    constructor(oauth: any, req: any, host: any, username?: string, password?: string);
    connect(): Promise<{
        connected: boolean;
    }>;
    readonly isAuthorised: boolean;
    get(url: string): Promise<{
        data: any;
        res: any;
    }>;
    post(url: string, body: any, post_content_type?: string): Promise<{
        data: any;
        res: any;
    }>;
    put(url: string, body: any, post_content_type?: string): Promise<{
        data: any;
        res: any;
    }>;
    delete(url: string): Promise<{
        data: any;
        res: any;
    }>;
    private authorise(payload);
    request(): Promise<{
        token: string;
        secret: string;
    }>;
    access(payload: any): Promise<{
        access_token: string;
        access_secret: string;
    }>;
    private _customLoginError(payload);
    private _errorHandler(err);
    private setTokenAndSecret(payload);
}
