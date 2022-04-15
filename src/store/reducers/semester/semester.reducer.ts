import { ISemesterState, IActionBase } from "../../models/root.interface";
import { ADD_SEMESTER, CHANGE_SEMESTER_PENDING_EDIT, EDIT_SEMESTER, REMOVE_SEMESTER,
    CLEAR_SEMESTER_PENDING_EDIT, SET_MODIFICATION_STATE} from "../../actions/semester/semester.actions";
import { ISemester, SemesterModificationStatus } from "../../models/semester.interface";



const initialState: ISemesterState = {
    modificationState: SemesterModificationStatus.None,
    selectedSemester: null,
    semesters: [{
        id: 1, name: "Học kì 1", year: "2022", description: ''
    }]
}

function semestersReducer(state: ISemesterState = initialState, action: IActionBase): ISemesterState {
    switch (action.type) {
        case ADD_SEMESTER: {
            let maxId: number = Math.max.apply(Math, state.semesters.map(function(o) { return o.id; }));
            action.semester.id = maxId + 1;
            return { ...state, semesters: [...state.semesters, action.semester]};
        }
        case EDIT_SEMESTER: {
            const foundIndex: number = state.semesters.findIndex(pr => pr.id === action.semester.id);
            let semesters: ISemester[] = state.semesters;
            semesters[foundIndex] = action.semester;
            return { ...state, semesters: semesters };
        }
        case REMOVE_SEMESTER: {
            return { ...state, semesters: state.semesters.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedSemester: action.semester };
        }
        case CLEAR_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedSemester: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default semestersReducer;