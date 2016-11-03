import { OauthConnection } from './oauth-connection';
export declare class User {
    user: any;
    static connection: OauthConnection;
    static setConnection(connection: OauthConnection): void;
    static get(id: string): Promise<User>;
    static login(payload: {
        username: string;
        password: string;
    }): Promise<{
        data: any;
        res: any;
    }>;
    constructor(user: any);
    update(body: any): Promise<any>;
    destroy(): Promise<{
        deleted: boolean;
        user: any;
    }>;
}
