import { OauthConnection } from './oauth-connection';
export declare class BaseModel {
    instance: any;
    static Model: any;
    static connection: OauthConnection;
    static modelName: any;
    static setConnection(connection: OauthConnection): void;
    static findById(id: string, query?: any): Promise<any>;
    static find(query?: any): Promise<any>;
    modelName: string;
    constructor(instance: any);
    update(body: any): Promise<any>;
}
