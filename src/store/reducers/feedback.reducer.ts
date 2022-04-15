import { IFeedBackState, IActionBase } from "../models/root.interface";
import { EDIT_BLOG, ADD_BLOG, REMOVE_BLOG, REMOVE_BLOG_WAIT} from "../actions/feedback.actions";
import { IFeedBack, FeedBackModificationStatus } from "../models/feedback.interface";

const initialState: IFeedBackState = {
    modificationState: FeedBackModificationStatus.None,
    selectedFeedback: null,
    feedbacks: [
        { id: 1, email: "nvlong00@gmail.com", description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa'},
        { id: 2, email: "ohmy@fr.pl", description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' }
    ],
    feedbackAccept: [
        { id: 3, email: "jcrock@em.pl", description: '' },
    ]
};

function feedbackReducer(state: IFeedBackState = initialState, action: IActionBase): IFeedBackState {
    switch (action.type) {
        case EDIT_BLOG: {
            const foundIndex: number = state.feedbackAccept.findIndex(pr => pr.id === action.blog.id);
            let blogAccept: IFeedBack[] = state.feedbackAccept;
            blogAccept[foundIndex] = action.blog;
            return { ...state, feedbackAccept: blogAccept };
        }
        case ADD_BLOG: {
            let maxId: number = Math.max.apply(Math, state.feedbackAccept.map(function(o) { return o.id; }));
            action.blog.id = maxId + 1;
            return { ...state, feedbacks: state.feedbacks.filter(x=>x.id !== action.blog.id), feedbackAccept: [...state.feedbackAccept, action.blog]};
        }
        case REMOVE_BLOG: {
            return { ...state, feedbackAccept: state.feedbackAccept.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_BLOG_WAIT: {
            return { ...state, feedbacks: state.feedbacks.filter(pr => pr.id !== action.id) };
        }
        default:
            return state;
    }
}

export default feedbackReducer;