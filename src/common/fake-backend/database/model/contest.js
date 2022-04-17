export class Contest {
    constructor(contestJson) {
        this.id = contestJson.id
        this.name = contestJson.name
        this.description = contestJson.description
        this.is_enabled = contestJson.is_enabled
        this.max_participant = contestJson.max_participant
        this.image_url = contestJson.image_url
        this.art_type_id = contestJson.art_type_id
        this.art_level_id = contestJson.art_level_id
        this.start_time = contestJson.start_time
        this.end_time = contestJson.end_time
    }
}