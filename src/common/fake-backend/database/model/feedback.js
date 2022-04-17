export class Feedback {
    constructor(feedbackJson) {
        this.id = feedbackJson.id
        this.email = feedbackJson.email
        this.content = feedbackJson.content
    }
}