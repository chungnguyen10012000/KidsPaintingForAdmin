import { ICourseSemesterState, IActionBase } from "../models/root.interface";
import { ADD_COURSE_SEMESTER, CHANGE_COURSE_SEMESTER_PENDING_EDIT, EDIT_COURSE_SEMESTER, REMOVE_COURSE_SEMESTER,
    CLEAR_COURSE_SEMESTER_PENDING_EDIT, SET_MODIFICATION_STATE_SEMESTER, CHANGE_COURSE_SEMESTER_AMOUNT, INITIAL_COURSE_SEMESTER, REMOVE_COURSE_SEMESTER_ALL} from "../actions/course_for_semester.actions";
import { ICourseSemester, CourseSemesterModificationStatus } from "../models/course_for_semester.interface";



const initialState: ICourseSemesterState = {
    modificationState: CourseSemesterModificationStatus.None,
    selectedCourseSemester: null,
    courseSemesters: []
};

function coursesSemesterReducer(state: ICourseSemesterState = initialState, action: IActionBase): ICourseSemesterState {
    switch (action.type) {
        case INITIAL_COURSE_SEMESTER: {
            let maxId: number = 0;
            action.courseSemester.id = maxId + 1;
            return { ...state, courseSemesters : [...state.courseSemesters, action.courseSemester]};
        }
        case ADD_COURSE_SEMESTER: {
            let maxId: number = Math.max.apply(Math, state.courseSemesters.map(function(o) { return o.id; }));
            action.courseSemester.id = maxId + 1;
            return { ...state, courseSemesters: [...state.courseSemesters, action.courseSemester]};
        }
        case EDIT_COURSE_SEMESTER: {
            const foundIndex: number = state.courseSemesters.findIndex(pr => pr.id === action.courseSemester.id);
            let courseSemesters: ICourseSemester[] = state.courseSemesters;
            courseSemesters[foundIndex] = action.courseSemester;
            return { ...state, courseSemesters: courseSemesters };
        }
        case REMOVE_COURSE_SEMESTER: {
            return { ...state, courseSemesters: state.courseSemesters.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_COURSE_SEMESTER_ALL: {
            return { ...state, courseSemesters: [] };
        }
        case CHANGE_COURSE_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedCourseSemester: action.courseSemester };
        }
        case CLEAR_COURSE_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedCourseSemester: null };
        }
        case SET_MODIFICATION_STATE_SEMESTER: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_COURSE_SEMESTER_AMOUNT: {
            const foundIndex: number = state.courseSemesters.findIndex(pr => pr.id === action.id);
            let courseSemesters: ICourseSemester[] = state.courseSemesters;
            courseSemesters[foundIndex].id = courseSemesters[foundIndex].id - action.amount;
            return { ...state, courseSemesters: courseSemesters };
        }
        default:
            return state;
    }
}


export default coursesSemesterReducer;