export interface IContest {
    id: number;
    name: string;
    description: string;
    art_level_id: number;
    art_type_id: number;
    is_enabled: boolean;
    max_participant: number;
    image_url: string;
    start_time: string;
    end_time: string;
}

export enum ContestModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}