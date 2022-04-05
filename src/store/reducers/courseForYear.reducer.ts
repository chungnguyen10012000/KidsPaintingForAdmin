import { ICourseForYearState, IActionBase } from "../models/root.interface";
import { ADD_COURSE_FOR_YEAR, EDIT_COURSE_FOR_YEAR, REMOVE_COURSE_FOR_YEAR,
    CLEAR_COURSE_FOR_YEAR_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_COURSE_FOR_YEAR_PENDING_EDIT} from "../actions/courseForYear.actions";
import { ICourseForYear, CourseForYearModificationStatus } from "../models/courseForYear.interface";



const initialState: ICourseForYearState = {
    modificationState: CourseForYearModificationStatus.None,
    selectedCourseForYear: null,
    courseForYear: [{
        courseId: 1, courseName: "Khóa học chì màu dành cho trẻ 5-9 tuổi", semester: "Kì 1", time: "Thứ 2-4-6"
    }]
};

function coursesForYearReducer(state: ICourseForYearState = initialState, action: IActionBase): ICourseForYearState {
    switch (action.type) {
        case ADD_COURSE_FOR_YEAR: {
            let maxId: number = Math.max.apply(Math, state.courseForYear.map(function(o) { return o.courseId; }));
            action.courseForYear.courseId = maxId + 1;
            return { ...state, courseForYear: [...state.courseForYear, action.courseForYear]};
        }
        case EDIT_COURSE_FOR_YEAR: {
            const foundIndex: number = state.courseForYear.findIndex(pr => pr.courseId === action.course.id);
            let courses: ICourseForYear[] = state.courseForYear;
            courses[foundIndex] = action.courseForYear;
            return { ...state, courseForYear: courses };
        }
        case REMOVE_COURSE_FOR_YEAR: {
            return { ...state, courseForYear: state.courseForYear.filter(pr => pr.courseId !== action.id) };
        }
        case CHANGE_COURSE_FOR_YEAR_PENDING_EDIT: {
            return { ...state, selectedCourseForYear: action.courseForYear };
        }
        case CLEAR_COURSE_FOR_YEAR_PENDING_EDIT: {
            return { ...state, selectedCourseForYear: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default coursesForYearReducer;