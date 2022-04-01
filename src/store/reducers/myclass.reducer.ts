import { IMyClassState, IActionBase } from "../models/root.interface";
import { ADD_MYCLASS, CHANGE_MYCLASS_PENDING_EDIT, EDIT_MYCLASS, REMOVE_MYCLASS,
    CLEAR_MYCLASS_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_MYCLASS_AMOUNT} from "../actions/myclass.actions";
import { IMyClass, MyClassModificationStatus } from "../models/myclass.interface";



const initialState: IMyClassState = {
    modificationState: MyClassModificationStatus.None,
    selectedMyClass: null,
    myclass: [{
        id: 1, name: "CM-1", course: 'Khóa học chì màu dành cho trẻ 5-9 tuổi', teacher_id: 'Chung Nguyen',
        amount: 6
    },
    {
        id: 2, name: "CM-2", course: 'Khóa học chì màu dành cho trẻ 5-9 tuổi', teacher_id: '',
        amount: 6
    }]
};

function myclasssReducer(state: IMyClassState = initialState, action: IActionBase): IMyClassState {
    switch (action.type) {
        case ADD_MYCLASS: {
            let maxId: number = Math.max.apply(Math, state.myclass.map(function(o) { return o.id; }));
            action.myclass.id = maxId + 1;
            return { ...state, myclass: [...state.myclass, action.myclass]};
        }
        case EDIT_MYCLASS: {
            const foundIndex: number = state.myclass.findIndex(pr => pr.id === action.myclass.id);
            let myclasss: IMyClass[] = state.myclass;
            myclasss[foundIndex] = action.myclass;
            return { ...state, myclass: myclasss };
        }
        case REMOVE_MYCLASS: {
            return { ...state, myclass: state.myclass.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_MYCLASS_PENDING_EDIT: {
            return { ...state, selectedMyClass: action.myclass };
        }
        case CLEAR_MYCLASS_PENDING_EDIT: {
            return { ...state, selectedMyClass: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_MYCLASS_AMOUNT: {
            const foundIndex: number = state.myclass.findIndex(pr => pr.id === action.id);
            let myclasss: IMyClass[] = state.myclass;
            myclasss[foundIndex].amount = myclasss[foundIndex].amount - action.amount;
            return { ...state, myclass: myclasss };
        }
        default:
            return state;
    }
}


export default myclasssReducer;