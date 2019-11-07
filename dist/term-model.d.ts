import { ScoutQuery } from './';
import { BaseModel, BaseModels } from './base-model';
import { OauthConnection } from './oauth-connection';
export declare class Term extends BaseModel {
    static modelName: string;
    static Model: typeof Term;
    static connection: OauthConnection;
    static tags(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static categories(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static question_categories(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static organization(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static topics_news(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static topics_events(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static countries(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static languages(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static topics_tutorials(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static scouting_interests(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static associations(query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    static getByVid(vid: number, query?: ScoutQuery, all?: boolean): Promise<BaseModels>;
    private static assignVid(vid, query?);
    constructor(topic: any);
}
