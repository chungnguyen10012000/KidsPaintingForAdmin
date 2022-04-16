export class Blog {
    constructor(blogJson) {
        this.id = blogJson.id
        this.name = blogJson.name
        this.description = blogJson.description
        this.image_url = blogJson.image_url
    }
}