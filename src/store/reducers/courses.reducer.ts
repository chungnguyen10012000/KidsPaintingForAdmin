import { ICourseState, IActionBase } from "../models/root.interface";
import { ADD_COURSE, CHANGE_COURSE_PENDING_EDIT, EDIT_COURSE, REMOVE_COURSE,
    CLEAR_COURSE_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_COURSE_AMOUNT} from "../actions/courses.actions";
import { ICourse, CourseModificationStatus } from "../models/courses.interface";



const initialState: ICourseState = {
    modificationState: CourseModificationStatus.None,
    selectedCourse: null,
    courses: [{
        courseId: 1, courseName: "Khóa học chì màu dành cho trẻ 5-9 tuổi",  courseLevel: '5-9 tuổi', courseType: 'Chì màu', courseDescription: '<p></p>', coursePrice: 2000000, maxCourseParticipant: 25, sumOfSection: 25, time: "Thứ 2-4-6"
    }]
};

function coursesReducer(state: ICourseState = initialState, action: IActionBase): ICourseState {
    switch (action.type) {
        case ADD_COURSE: {
            let maxId: number = Math.max.apply(Math, state.courses.map(function(o) { return o.courseId; }));
            action.course.courseId = maxId + 1;
            return { ...state, courses: [...state.courses, action.course]};
        }
        case EDIT_COURSE: {
            const foundIndex: number = state.courses.findIndex(pr => pr.courseId === action.course.id);
            let courses: ICourse[] = state.courses;
            courses[foundIndex] = action.course;
            return { ...state, courses: courses };
        }
        case REMOVE_COURSE: {
            return { ...state, courses: state.courses.filter(pr => pr.courseId !== action.id) };
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
            const foundIndex: number = state.courses.findIndex(pr => pr.courseId === action.id);
            let courses: ICourse[] = state.courses;
            courses[foundIndex].coursePrice = courses[foundIndex].coursePrice - action.amount;
            return { ...state, courses: courses };
        }
        default:
            return state;
    }
}


export default coursesReducer;