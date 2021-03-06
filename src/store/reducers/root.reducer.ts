import { combineReducers, Reducer } from "redux";
import { UPDATE_CURRENT_PATH } from "../actions/root.actions";
import { IRootStateType, IActionBase, IStateType } from "../models/root.interface";
import productsReducer from "./products.reducer";
import notificationReducer from "./notification.reducer";
import userReducer from "./users.reducer";
import orderReducer from "./order.reducer";
import accountReducer from "./account.reducer";
import courseReducer from "./courses.reducer";
import contestReducer from "./contest.reducer";
import myclasssReducer from "./myclass.reducer";
import mytypesReducer from "./mytypes.reducer";
import levelsReducer from "./levels.reducer";
import exercisesReducer from "./exercise.reducer";
import feedbackReducer from "./feedback.reducer";
import sessonsReducer from "./sesson.reducer";
import blogReducer from "./blog.reducer";
import employeeReducer from "./employee.reducer";
import coursesSemesterReducer from "./course_for_semester.reducer";
import lessonTimesReducer from "./lesson_time.reducer";
import schedulesReducer from "./schedule.reducer";
import scheduleItemsReducer from "./schedule_item.reducer";
import semestersReducer from "./semester.reducer";

const initialState: IRootStateType = {
    page: {area: "home", subArea: ""}
};

function rootReducer(state: IRootStateType = initialState, action: IActionBase): IRootStateType {
    switch (action.type) {
        case UPDATE_CURRENT_PATH:
            return { ...state, page: {area: action.area, subArea: action.subArea}};
        default:
            return state;
    }
}

const rootReducers: Reducer<IStateType> = combineReducers({
    root: rootReducer,
    products: productsReducer,
    notifications: notificationReducer,
    courses: courseReducer,
    myclass: myclasssReducer,
    contest: contestReducer,
    users: userReducer,
    orders: orderReducer,
    account: accountReducer,
    mytypes: mytypesReducer,
    levels: levelsReducer,
    exercises: exercisesReducer,
    feedbacks: feedbackReducer,
    sessons: sessonsReducer,
    blogs: blogReducer,
    employees: employeeReducer,
    courseSemeters: coursesSemesterReducer,
    lessonTimes: lessonTimesReducer,
    schedules: schedulesReducer,
    scheduleItems: scheduleItemsReducer,
    semesters: semestersReducer,
});



export default rootReducers;