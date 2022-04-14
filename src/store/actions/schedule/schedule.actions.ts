import { ISchedule, ScheduleModificationStatus } from "../../models/schedule.interface";
export const ADD_SCHEDULE: string = "ADD_SCHEDULE";
export const EDIT_SCHEDULE: string = "EDIT_SCHEDULE";
export const LIST_LESSON: string = "LIST_LESSON";
export const REMOVE_SCHEDULE: string = "REMOVE_SCHEDULE";
export const CHANGE_SCHEDULE_AMOUNT: string = "CHANGE_SCHEDULE_AMOUNT";
export const CHANGE_SCHEDULE_PENDING_EDIT: string = "CHANGE_SCHEDULE_PENDING_EDIT";
export const CLEAR_SCHEDULE_PENDING_EDIT: string = "CLEAR_SCHEDULE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addSchedule(schedule: ISchedule): IAddScheduleActionType {
    return { type: ADD_SCHEDULE, schedule: schedule };
}

export function editSchedule(schedule: ISchedule): IEditScheduleActionType {
    return { type: EDIT_SCHEDULE, schedule: schedule };
}

export function removeSchedule(id: number): IRemoveScheduleActionType {
    return { type: REMOVE_SCHEDULE, id: id };
}

export function listLesson(schedule: ISchedule): IListLessonScheduleActionType {
    return { type: LIST_LESSON, schedule: schedule };
}

export function changeScheduleAmount(id: number, amount: number): IChangeScheduleAmountType {
    return { type: CHANGE_SCHEDULE_AMOUNT, id: id, amount: amount };
}

export function changeSelectedSchedule(schedule: ISchedule): IChangeSelectedScheduleActionType {
    return { type: CHANGE_SCHEDULE_PENDING_EDIT, schedule: schedule };
}

export function clearSelectedSchedule(): IClearSelectedScheduleActionType {
    return { type: CLEAR_SCHEDULE_PENDING_EDIT };
}

export function setModificationState(value: ScheduleModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddScheduleActionType { type: string, schedule: ISchedule };
interface IEditScheduleActionType { type: string, schedule: ISchedule };
interface IRemoveScheduleActionType { type: string, id: number };
interface IListLessonScheduleActionType { type: string, schedule: ISchedule };
interface IChangeSelectedScheduleActionType { type: string, schedule: ISchedule };
interface IClearSelectedScheduleActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ScheduleModificationStatus};
interface IChangeScheduleAmountType {type: string, id: number, amount: number};