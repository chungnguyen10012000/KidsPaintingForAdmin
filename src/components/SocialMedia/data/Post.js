export class PostModel {
    constructor(postJson) {
        this.id =postJson.id
        this.post_content = postJson.post_content
        this.post_image = postJson.post_image
    }
}