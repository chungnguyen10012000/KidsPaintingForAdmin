import { ILessonTime, LessonTimeModificationStatus } from "../../models/lesson_time.interface";
export const ADD_LESSON_TIME: string = "ADD_LESSON_TIME";
export const EDIT_LESSON_TIME: string = "EDIT_LESSON_TIME";
export const REMOVE_LESSON_TIME: string = "REMOVE_LESSON_TIME";
export const CHANGE_LESSON_TIME_AMOUNT: string = "CHANGE_LESSON_TIME_AMOUNT";
export const CHANGE_LESSON_TIME_PENDING_EDIT: string = "CHANGE_LESSON_TIME_PENDING_EDIT";
export const CLEAR_LESSON_TIME_PENDING_EDIT: string = "CLEAR_LESSON_TIME_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addLessonTime(lessontime: ILessonTime): IAddLessonTimeActionType {
    return { type: ADD_LESSON_TIME, lessontime: lessontime };
}

export function editLessonTime(lessontime: ILessonTime): IEditLessonTimeActionType {
    return { type: EDIT_LESSON_TIME, lessontime: lessontime };
}

export function removeLessonTime(id: number): IRemoveLessonTimeActionType {
    return { type: REMOVE_LESSON_TIME, id: id };
}

export function changeLessonTimeAmount(id: number, amount: number): IChangeLessonTimeAmountType {
    return { type: CHANGE_LESSON_TIME_AMOUNT, id: id, amount: amount };
}

export function changeSelectedLessonTime(lessontime: ILessonTime): IChangeSelectedLessonTimeActionType {
    return { type: CHANGE_LESSON_TIME_PENDING_EDIT, lessontime: lessontime };
}

export function clearSelectedLessonTime(): IClearSelectedLessonTimeActionType {
    return { type: CLEAR_LESSON_TIME_PENDING_EDIT };
}

export function setModificationState(value: LessonTimeModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddLessonTimeActionType { type: string, lessontime: ILessonTime };
interface IEditLessonTimeActionType { type: string, lessontime: ILessonTime };
interface IRemoveLessonTimeActionType { type: string, id: number };
interface IChangeSelectedLessonTimeActionType { type: string, lessontime: ILessonTime };
interface IClearSelectedLessonTimeActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  LessonTimeModificationStatus};
interface IChangeLessonTimeAmountType {type: string, id: number, amount: number};