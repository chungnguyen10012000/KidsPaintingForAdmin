import { IMytypeState, IActionBase } from "../models/root.interface";
import { ADD_MYTYPE, CHANGE_MYTYPE_PENDING_EDIT, EDIT_MYTYPE, REMOVE_MYTYPE,
    CLEAR_MYTYPE_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_MYTYPE_AMOUNT} from "../actions/mytypes.actions";
import { IMytype, MytypeModificationStatus } from "../models/mytypes.interface";



const initialState: IMytypeState = {
    modificationState: MytypeModificationStatus.None,
    selectedMytype: null,
    mytypes: [{
        id: 1, name: "Chì màu"
    }]
};

function mytypesReducer(state: IMytypeState = initialState, action: IActionBase): IMytypeState {
    switch (action.type) {
        case ADD_MYTYPE: {
            let maxId: number = Math.max.apply(Math, state.mytypes.map(function(o) { return o.id; }));
            action.mytype.id = maxId + 1;
            return { ...state, mytypes: [...state.mytypes, action.mytype]};
        }
        case EDIT_MYTYPE: {
            const foundIndex: number = state.mytypes.findIndex(pr => pr.id === action.mytype.id);
            let mytypes: IMytype[] = state.mytypes;
            mytypes[foundIndex] = action.mytype;
            return { ...state, mytypes: mytypes };
        }
        case REMOVE_MYTYPE: {
            return { ...state, mytypes: state.mytypes.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_MYTYPE_PENDING_EDIT: {
            return { ...state, selectedMytype: action.mytype };
        }
        case CLEAR_MYTYPE_PENDING_EDIT: {
            return { ...state, selectedMytype: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_MYTYPE_AMOUNT: {
            const foundIndex: number = state.mytypes.findIndex(pr => pr.id === action.id);
            let mytypes: IMytype[] = state.mytypes;
            mytypes[foundIndex].id = mytypes[foundIndex].id - action.amount;
            return { ...state, mytypes: mytypes };
        }
        default:
            return state;
    }
}


export default mytypesReducer;