import { feedbackList } from "../../database/data/feedback"
import { Feedback } from "../../database/model/feedback"

const contexParse = (res) => {
    const feedbacks = []
    res.forEach(element => {
        feedbacks.push(new Feedback(element))
    });
    return feedbacks
}

export function getFeedback(ok) {
    const fakeFeedbackList = contexParse(feedbackList)
    return ok(fakeFeedbackList);
}