import { ScoutQuery } from './';
import { BaseModel } from './base-model';
import { OauthConnection } from './oauth-connection';
export declare class Term extends BaseModel {
    static modelName: string;
    static Model: typeof Term;
    static connection: OauthConnection;
    static tags(query?: ScoutQuery): Promise<any>;
    static categories(query?: ScoutQuery): Promise<any>;
    static question_categories(query?: ScoutQuery): Promise<any>;
    static organization(query?: ScoutQuery): Promise<any>;
    static topics_news(query?: ScoutQuery): Promise<any>;
    static topics_events(query?: ScoutQuery): Promise<any>;
    static countries(query?: ScoutQuery): Promise<any>;
    static languages(query?: ScoutQuery): Promise<any>;
    static topics_tutorials(query?: ScoutQuery): Promise<any>;
    static scouting_interests(query?: ScoutQuery): Promise<any>;
    static associations(query?: ScoutQuery): Promise<any>;
    static getByVid(vid: number, query?: ScoutQuery): Promise<any>;
    constructor(topic: any);
}
