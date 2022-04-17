export interface ICourse {
    id: number;
    name: string;
    description: string;
    art_type_id: number;
    art_level_id: number;
    price: number;
    max_participant: number;
    sum_of_section: number;
    image_url: string;
    is_enabled: boolean;
}

export enum CourseModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}