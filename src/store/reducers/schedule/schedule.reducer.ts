import { IScheduleState, IActionBase } from "../../models/root.interface";
import { ADD_SCHEDULE, CHANGE_SCHEDULE_PENDING_EDIT, EDIT_SCHEDULE, REMOVE_SCHEDULE,
    CLEAR_SCHEDULE_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_SCHEDULE_AMOUNT} from "../../actions/schedule/schedule.actions";
import { ISchedule, ScheduleModificationStatus } from "../../models/schedule.interface";



const initialState: IScheduleState = {
    modificationState: ScheduleModificationStatus.None,
    selectedSchedule: null,
    schedules: [{
        id: 1, name: "XXX", creator_id: '1', description: '', createTime: '', updateTime: ''
    }]
};

function schedulesReducer(state: IScheduleState = initialState, action: IActionBase): IScheduleState {
    switch (action.type) {
        case ADD_SCHEDULE: {
            let maxId: number = Math.max.apply(Math, state.schedules.map(function(o) { return o.id; }));
            action.schedule.id = maxId + 1;
            return { ...state, schedules: [...state.schedules, action.schedule]};
        }
        case EDIT_SCHEDULE: {
            const foundIndex: number = state.schedules.findIndex(pr => pr.id === action.schedule.id);
            let schedules: ISchedule[] = state.schedules;
            schedules[foundIndex] = action.schedule;
            return { ...state, schedules: schedules };
        }
        case REMOVE_SCHEDULE: {
            return { ...state, schedules: state.schedules.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_SCHEDULE_PENDING_EDIT: {
            return { ...state, selectedSchedule: action.schedule };
        }
        case CLEAR_SCHEDULE_PENDING_EDIT: {
            return { ...state, selectedSchedule: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default schedulesReducer;