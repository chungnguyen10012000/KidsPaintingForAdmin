import { ILessonTimeState, IActionBase } from "../../models/root.interface";
import { ADD_LESSON_TIME, CHANGE_LESSON_TIME_PENDING_EDIT, EDIT_LESSON_TIME, REMOVE_LESSON_TIME,
    CLEAR_LESSON_TIME_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_LESSON_TIME_AMOUNT} from "../../actions/lesson_time/lesson_time.actions";
import { ILessonTime, LessonTimeModificationStatus } from "../../models/lesson_time.interface";



const initialState: ILessonTimeState = {
    modificationState: LessonTimeModificationStatus.None,
    selectedLessonTime: null,
    lessonTimes: [
        {id: 1, start_time: "08:00", end_time: "09:00"}
    ]
};

function lessonTimesReducer(state: ILessonTimeState = initialState, action: IActionBase): ILessonTimeState {
    switch (action.type) {
        case ADD_LESSON_TIME: {
            let maxId: number = Math.max.apply(Math, state.lessonTimes.map(function(o) { return o.id; }));
            action.lessontime.id = maxId + 1;
            return { ...state, lessonTimes: [...state.lessonTimes, action.lessontime]};
        }
        case EDIT_LESSON_TIME: {
            const foundIndex: number = state.lessonTimes.findIndex(pr => pr.id === action.lessontime.id);
            let lessonTimes: ILessonTime[] = state.lessonTimes;
            lessonTimes[foundIndex] = action.lessontime;
            return { ...state, lessonTimes: lessonTimes };
        }
        case REMOVE_LESSON_TIME: {
            return { ...state, lessonTimes: state.lessonTimes.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_LESSON_TIME_PENDING_EDIT: {
            return { ...state, selectedLessonTime: action.lessontime };
        }
        case CLEAR_LESSON_TIME_PENDING_EDIT: {
            return { ...state, selectedLessonTime: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default lessonTimesReducer;