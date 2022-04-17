import { ICourseState, IActionBase } from "../../models/root.interface";
import { ADD_COURSE, CHANGE_COURSE_PENDING_EDIT, EDIT_COURSE, REMOVE_COURSE,
    CLEAR_COURSE_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_COURSE_AMOUNT, INITIAL_COURSE, REMOVE_COURSE_ALL} from "../../actions/course/courses.actions";
import { ICourse, CourseModificationStatus } from "../../models/courses.interface";



const initialState: ICourseState = {
    modificationState: CourseModificationStatus.None,
    selectedCourse: null,
    courses: []
};

function coursesReducer(state: ICourseState = initialState, action: IActionBase): ICourseState {
    switch (action.type) {
        case INITIAL_COURSE: {
            let maxId: number = 0;
            action.course.id = maxId + 1;
            return { ...state, courses : [...state.courses, action.course]};
        }
        case ADD_COURSE: {
            let maxId: number = Math.max.apply(Math, state.courses.map(function(o) { return o.id; }));
            action.course.id = maxId + 1;
            return { ...state, courses: [...state.courses, action.course]};
        }
        case EDIT_COURSE: {
            const foundIndex: number = state.courses.findIndex(pr => pr.id === action.course.id);
            let courses: ICourse[] = state.courses;
            courses[foundIndex] = action.course;
            return { ...state, courses: courses };
        }
        case REMOVE_COURSE_ALL: {
            return { ...state, courses: [] };
        }
        case REMOVE_COURSE: {
            return { ...state, courses: state.courses.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourse: action.course };
        }
        case CLEAR_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourse: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_COURSE_AMOUNT: {
            const foundIndex: number = state.courses.findIndex(pr => pr.id === action.id);
            let courses: ICourse[] = state.courses;
            courses[foundIndex].price = courses[foundIndex].price - action.amount;
            return { ...state, courses: courses };
        }
        default:
            return state;
    }
}


export default coursesReducer;