import { IScheduleItem, ScheduleItemModificationStatus } from "../../models/schedule_item.interface";
export const ADD_SCHEDULE_ITEM: string = "ADD_SCHEDULE_ITEM";
export const EDIT_SCHEDULE_ITEM: string = "EDIT_SCHEDULE_ITEM";
export const LIST_LESSON: string = "LIST_LESSON";
export const REMOVE_SCHEDULE_ITEM: string = "REMOVE_SCHEDULE_ITEM";
export const CHANGE_SCHEDULE_ITEM_AMOUNT: string = "CHANGE_SCHEDULE_ITEM_AMOUNT";
export const CHANGE_SCHEDULE_ITEM_PENDING_EDIT: string = "CHANGE_SCHEDULE_ITEM_PENDING_EDIT";
export const CLEAR_SCHEDULE_ITEM_PENDING_EDIT: string = "CLEAR_SCHEDULE_ITEM_PENDING_EDIT";
export const SET_MODIFICATION_STATE_ITEM: string = "SET_MODIFICATION_STATE_ITEM";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_SCHEDULE_ITEM_ALL: string = "REMOVE_SCHEDULE_ITEM_ALL";
export const INITIAL_SCHEDULE_ITEM: string = "INITIAL_SCHEDULE_ITEM";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(schedule: IScheduleItem) {
    return {
        type: FETCH_DATA_SUCCESS,
        schedule
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialScheduleItem(schedule: IScheduleItem): IInitialScheduleItemActionType {
    return { type: INITIAL_SCHEDULE_ITEM, schedule: schedule };
}

export function removeScheduleItemAll(): IRemoveScheduleItemAllActionType {
    return { type: REMOVE_SCHEDULE_ITEM_ALL };
}

export function addScheduleItem(schedule: IScheduleItem): IAddScheduleItemActionType {
    return { type: ADD_SCHEDULE_ITEM, schedule: schedule };
}

export function editScheduleItem(schedule: IScheduleItem): IEditScheduleItemActionType {
    return { type: EDIT_SCHEDULE_ITEM, schedule: schedule };
}

export function removeScheduleItem(id: number): IRemoveScheduleItemActionType {
    return { type: REMOVE_SCHEDULE_ITEM, id: id };
}

export function listLesson(schedule: IScheduleItem): IListLessonScheduleItemActionType {
    return { type: LIST_LESSON, schedule: schedule };
}

export function changeScheduleItemAmount(id: number, amount: number): IChangeScheduleItemAmountType {
    return { type: CHANGE_SCHEDULE_ITEM_AMOUNT, id: id, amount: amount };
}

export function changeSelectedScheduleItem(schedule: IScheduleItem): IChangeSelectedScheduleItemActionType {
    return { type: CHANGE_SCHEDULE_ITEM_PENDING_EDIT, schedule: schedule };
}

export function clearSelectedScheduleItem(): IClearSelectedScheduleItemActionType {
    return { type: CLEAR_SCHEDULE_ITEM_PENDING_EDIT };
}

export function setModificationStateItem(value: ScheduleItemModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE_ITEM, value: value };
}

interface IAddScheduleItemActionType { type: string, schedule: IScheduleItem };
interface IEditScheduleItemActionType { type: string, schedule: IScheduleItem };
interface IRemoveScheduleItemActionType { type: string, id: number };
interface IListLessonScheduleItemActionType { type: string, schedule: IScheduleItem };
interface IChangeSelectedScheduleItemActionType { type: string, schedule: IScheduleItem };
interface IClearSelectedScheduleItemActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ScheduleItemModificationStatus};
interface IChangeScheduleItemAmountType {type: string, id: number, amount: number};
interface IRemoveScheduleItemAllActionType { type: string }
interface IInitialScheduleItemActionType {type: string, schedule: IScheduleItem}