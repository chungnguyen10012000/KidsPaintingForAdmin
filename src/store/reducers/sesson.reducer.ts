import { ISessonState, IActionBase } from "../models/root.interface";
import { ADD_SESSON, CHANGE_SESSON_PENDING_EDIT, EDIT_SESSON, REMOVE_SESSON,
    CLEAR_SESSON_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_SESSON_AMOUNT} from "../actions/sesson.action";
import { ISesson, SessonModificationStatus } from "../models/sesson.interface";



const initialState: ISessonState = {
    modificationState: SessonModificationStatus.None,
    selectedSesson: null,
    sessons: [{
        id: 1, name: "Kiến thức cơ bản", description: '...', startTime: '9:00', endTime: '11:00', currentDay:  '10-10-2020'
    },
    {
        id: 2, name: "Xây dựng bố cục", description: '...', startTime: '10:00', endTime: '12:00', currentDay: '10-11-2020'
    },
    {
        id: 3, name: "Kiến thức cơ bản 2", description: '...', startTime: '9:00', endTime: '11:00', currentDay:  '10-10-2020'
    },
    {
        id: 4, name: "Kiến thức cơ bản 3", description: '...', startTime: '9:00', endTime: '11:00', currentDay:  '10-10-2020'
    },
    {
        id: 5, name: "Kiến thức cơ bản 4", description: '...', startTime: '9:00', endTime: '11:00', currentDay:  '10-10-2020'
    },
    {
        id: 6, name: "Kiến thức cơ bản 5", description: '...', startTime: '9:00', endTime: '11:00', currentDay:  '10-10-2020'
    }]
};

function sessonsReducer(state: ISessonState = initialState, action: IActionBase): ISessonState {
    switch (action.type) {
        case ADD_SESSON: {
            let maxId: number = Math.max.apply(Math, state.sessons.map(function(o) { return o.id; }));
            action.sesson.id = maxId + 1;
            return { ...state, sessons: [...state.sessons, action.sesson]};
        }
        case EDIT_SESSON: {
            const foundIndex: number = state.sessons.findIndex(pr => pr.id === action.sesson.id);
            let sessons: ISesson[] = state.sessons;
            sessons[foundIndex] = action.sesson;
            return { ...state, sessons: sessons };
        }
        case REMOVE_SESSON: {
            return { ...state, sessons: state.sessons.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_SESSON_PENDING_EDIT: {
            return { ...state, selectedSesson: action.sesson };
        }
        case CLEAR_SESSON_PENDING_EDIT: {
            return { ...state, selectedSesson: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_SESSON_AMOUNT: {
            const foundIndex: number = state.sessons.findIndex(pr => pr.id === action.id);
            let sessons: ISesson[] = state.sessons;
            sessons[foundIndex].id = sessons[foundIndex].id - action.id;
            return { ...state, sessons: sessons };
        }
        default:
            return state;
    }
}


export default sessonsReducer;