import { IScheduleItemState, IActionBase } from "../models/root.interface";
import { ADD_SCHEDULE_ITEM, CHANGE_SCHEDULE_ITEM_PENDING_EDIT, EDIT_SCHEDULE_ITEM, REMOVE_SCHEDULE_ITEM,
    CLEAR_SCHEDULE_ITEM_PENDING_EDIT, SET_MODIFICATION_STATE_ITEM, INITIAL_SCHEDULE_ITEM, REMOVE_SCHEDULE_ITEM_ALL} from "../actions/schedule_item.actions";
import { IScheduleItem, ScheduleItemModificationStatus } from "../models/schedule_item.interface";



const initialState: IScheduleItemState = {
    modificationState: ScheduleItemModificationStatus.None,
    selectedScheduleItem: null,
    scheduleItems: []
};

function scheduleItemsReducer(state: IScheduleItemState = initialState, action: IActionBase): IScheduleItemState {
    switch (action.type) {
        case INITIAL_SCHEDULE_ITEM: {
            let maxId: number = 0;
            action.schedule.id = maxId + 1;
            return { ...state, scheduleItems : [...state.scheduleItems, action.schedule]};
        }
        case ADD_SCHEDULE_ITEM: {
            let maxId: number = Math.max.apply(Math, state.scheduleItems.map(function(o) { return o.id; }));
            action.schedule.id = maxId + 1;
            return { ...state, scheduleItems: [...state.scheduleItems, action.schedule]};
        }
        case EDIT_SCHEDULE_ITEM: {
            const foundIndex: number = state.scheduleItems.findIndex(pr => pr.id === action.schedule.id);
            let schedules: IScheduleItem[] = state.scheduleItems;
            schedules[foundIndex] = action.schedule;
            return { ...state, scheduleItems: schedules };
        }
        case REMOVE_SCHEDULE_ITEM: {
            return { ...state, scheduleItems: state.scheduleItems.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SCHEDULE_ITEM_ALL: {
            return { ...state, scheduleItems: [] };
        }
        case CHANGE_SCHEDULE_ITEM_PENDING_EDIT: {
            return { ...state, selectedScheduleItem: action.schedule };
        }
        case CLEAR_SCHEDULE_ITEM_PENDING_EDIT: {
            return { ...state, selectedScheduleItem: null };
        }
        case SET_MODIFICATION_STATE_ITEM: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default scheduleItemsReducer;