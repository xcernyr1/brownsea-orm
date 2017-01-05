import { OauthConnection, ScoutQuery } from './oauth-connection';
export declare class BaseModels {
    models: any[];
    count: number;
    constructor(models: any[], count: number);
}
export declare class BaseModel {
    instance: any;
    static MAX_INSTANCES_RETURNED: number;
    static Model: any;
    static connection: OauthConnection;
    static modelName: any;
    static setConnection(connection: OauthConnection): void;
    static findById(id: string, query?: ScoutQuery): Promise<any>;
    static find(query?: ScoutQuery): Promise<any>;
    modelName: string;
    constructor(instance: any);
    update(body: any): Promise<any>;
    static findAll(query: ScoutQuery): Promise<any>;
    private static ceil(count);
}
