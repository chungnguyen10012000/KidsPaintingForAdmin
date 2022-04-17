import { IFeedBackState, IActionBase } from "../../models/root.interface";
import { EDIT_FEEDBACK, ADD_FEEDBACK, REMOVE_FEEDBACK, REMOVE_FEEDBACK_WAIT, INITIAL_FEEDBACK, REMOVE_FEEDBACK_ALL} from "../../actions/feedback/feedback.actions";
import { IFeedBack, FeedBackModificationStatus } from "../../models/feedback.interface";

const initialState: IFeedBackState = {
    modificationState: FeedBackModificationStatus.None,
    selectedFeedback: null,
    feedbacks: []
};

function feedbackReducer(state: IFeedBackState = initialState, action: IActionBase): IFeedBackState {
    switch (action.type) {
        case INITIAL_FEEDBACK: {
            let maxId: number = 0;
            action.feedback.id = maxId + 1;
            return { ...state, feedbacks: [...state.feedbacks, action.feedback]};
        }
        case EDIT_FEEDBACK: {
            const foundIndex: number = state.feedbacks.findIndex(pr => pr.id === action.feedback.id);
            let feedback: IFeedBack[] = state.feedbacks;
            feedback[foundIndex] = action.feedback;
            return { ...state, feedbacks: feedback };
        }
        case ADD_FEEDBACK: {
            let maxId: number =  Math.max.apply(Math, state.feedbacks.map(function(o) { return o.id; }));
            action.feedback.id = maxId + 1;
            return { ...state, feedbacks: [...state.feedbacks, action.feedback]};
        }
        case REMOVE_FEEDBACK: {
            return { ...state, feedbacks: state.feedbacks.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_FEEDBACK_ALL: {
            return { ...state, feedbacks: [] };
        }
        case REMOVE_FEEDBACK_WAIT: {
            return { ...state, feedbacks: state.feedbacks.filter(pr => pr.id !== action.id) };
        }
        default:
            return state;
    }
}

export default feedbackReducer;