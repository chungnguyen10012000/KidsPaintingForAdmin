import { ICourseSemesterState, IActionBase } from "../models/root.interface";
import { ADD_COURSE_SEMESTER, CHANGE_COURSE_SEMESTER_PENDING_EDIT, EDIT_COURSE_SEMESTER, REMOVE_COURSE_SEMESTER,
    CLEAR_COURSE_SEMESTER_PENDING_EDIT, SET_MODIFICATION_STATE_SEMESTER, CHANGE_COURSE_SEMESTER_AMOUNT} from "../actions/course_for_semester.actions";
import { ICourseSemester, CourseSemesterModificationStatus } from "../models/course_for_semester.interface";



const initialState: ICourseSemesterState = {
    modificationState: CourseSemesterModificationStatus.None,
    selectedCourseSemester: null,
    courseSemesters: [{
        courseId: 1, courseTemplate: "Khóa học chì màu dành cho trẻ 5-9 tuổi",  timeLesson: '2022-05-10', time: "Thứ 2-4-6"
    }]
};

function coursesSemesterReducer(state: ICourseSemesterState = initialState, action: IActionBase): ICourseSemesterState {
    switch (action.type) {
        case ADD_COURSE_SEMESTER: {
            let maxId: number = Math.max.apply(Math, state.courseSemesters.map(function(o) { return o.courseId; }));
            action.courseSemester.courseId = maxId + 1;
            return { ...state, courseSemesters: [...state.courseSemesters, action.courseSemester]};
        }
        case EDIT_COURSE_SEMESTER: {
            const foundIndex: number = state.courseSemesters.findIndex(pr => pr.courseId === action.courseSemester.courseId);
            let courseSemesters: ICourseSemester[] = state.courseSemesters;
            courseSemesters[foundIndex] = action.courseSemester;
            return { ...state, courseSemesters: courseSemesters };
        }
        case REMOVE_COURSE_SEMESTER: {
            return { ...state, courseSemesters: state.courseSemesters.filter(pr => pr.courseId !== action.id) };
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
            const foundIndex: number = state.courseSemesters.findIndex(pr => pr.courseId === action.id);
            let courseSemesters: ICourseSemester[] = state.courseSemesters;
            courseSemesters[foundIndex].courseId = courseSemesters[foundIndex].courseId - action.amount;
            return { ...state, courseSemesters: courseSemesters };
        }
        default:
            return state;
    }
}


export default coursesSemesterReducer;