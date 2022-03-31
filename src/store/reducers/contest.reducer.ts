import { IContestState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST, CHANGE_CONTEST_PENDING_EDIT, EDIT_CONTEST, REMOVE_CONTEST,
    CLEAR_CONTEST_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_CONTEST_AMOUNT} from "../actions/contest.actions";
import { IContest, ContestModificationStatus } from "../models/contest.interface";



const initialState: IContestState = {
    modificationState: ContestModificationStatus.None,
    selectedContest: null,
    contest: [{
        id: 1, name: "Cuộc thi vẽ tranh gia đình", description: "<p></p>",
        type: "chì màu", level: "5-9 tuổi", status: "", amount: 50, hasBeginDate: "10/10/2022", hasExpiryDate: "10/11/2022", teacher: ''
    }]
};

function contestReducer(state: IContestState = initialState, action: IActionBase): IContestState {
    switch (action.type) {
        case ADD_CONTEST: {
            let maxId: number = Math.max.apply(Math, state.contest.map(function(o) { return o.id; }));
            action.contest.id = maxId + 1;
            return { ...state, contest: [...state.contest, action.contest]};
        }
        case EDIT_CONTEST: {
            const foundIndex: number = state.contest.findIndex(pr => pr.id === action.contest.id);
            let contest: IContest[] = state.contest;
            contest[foundIndex] = action.contest;
            return { ...state, contest: contest };
        }
        case REMOVE_CONTEST: {
            return { ...state, contest: state.contest.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_CONTEST_PENDING_EDIT: {
            return { ...state, selectedContest: action.contest };
        }
        case CLEAR_CONTEST_PENDING_EDIT: {
            return { ...state, selectedContest: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_CONTEST_AMOUNT: {
            const foundIndex: number = state.contest.findIndex(pr => pr.id === action.id);
            let contest: IContest[] = state.contest;
            contest[foundIndex].amount = contest[foundIndex].amount - action.amount;
            return { ...state, contest: contest };
        }
        default:
            return state;
    }
}


export default contestReducer;