import { BaseModel } from './base-model';
import { OauthConnection } from './oauth-connection';
export declare class User extends BaseModel {
    static modelName: string;
    static Model: typeof User;
    static connection: OauthConnection;
    constructor(user: any);
}
