export class Course {
    constructor(courseJson) {
        this.id = courseJson.id
        this.name = courseJson.name
        this.description = courseJson.description
        this.art_level_id = courseJson.art_level_id
        this.art_type_id = courseJson.art_type_id
        this.price = courseJson.price
        this.image_url = courseJson.image_url
        this.max_participant = courseJson.max_participant
        this.sum_of_section = courseJson.sum_of_section
        this.is_enabled = courseJson.is_enabled
    }
}