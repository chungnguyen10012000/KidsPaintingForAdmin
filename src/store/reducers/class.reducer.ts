import { IClassState, IActionBase } from "../models/root.interface";
import { ADD_CLASS, CHANGE_CLASS_PENDING_EDIT, EDIT_CLASS, REMOVE_CLASS,
    CLEAR_CLASS_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_CLASS_AMOUNT} from "../actions/class.actions";
import { IClass, ClassModificationStatus } from "../models/class.interface";



const initialState: IClassState = {
    modificationState: ClassModificationStatus.None,
    selectedClass: null,
    class: [{
        id: 1, name: "CM-1", course: 1, teacher_id: 1,
        amount: 6
    },
    {
        id: 2, name: "CM-2", course: 1, teacher_id: 2,
        amount: 6
    }]
};

function classReducer(state: IClassState = initialState, action: IActionBase): IClassState {
    switch (action.type) {
        case ADD_CLASS: {
            let maxId: number = Math.max.apply(Math, state.class.map(function(o) { return o.id; }));
            action.myClass.id = maxId + 1;
            return { ...state, class: [...state.class, action.myClass]};
        }
        case EDIT_CLASS: {
            const foundIndex: number = state.class.findIndex(pr => pr.id === action.myClass.id);
            let myClass: IClass[] = state.class;
            myClass[foundIndex] = action.myClass;
            return { ...state, class: myClass };
        }
        case REMOVE_CLASS: {
            return { ...state, class: state.class.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_CLASS_PENDING_EDIT: {
            return { ...state, selectedClass: action.class };
        }
        case CLEAR_CLASS_PENDING_EDIT: {
            return { ...state, selectedClass: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_CLASS_AMOUNT: {
            const foundIndex: number = state.class.findIndex(pr => pr.id === action.id);
            let myClass: IClass[] = state.class;
            myClass[foundIndex].amount = myClass[foundIndex].amount - action.amount;
            return { ...state, class: myClass };
        }
        default:
            return state;
    }
}


export default classReducer;