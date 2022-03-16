import { ISesson, SessonModificationStatus } from "../models/sesson.interface";
export const ADD_SESSON: string = "ADD_SESSON";
export const EDIT_SESSON: string = "EDIT_SESSON";
export const LIST_LESSON: string = "LIST_LESSON";
export const REMOVE_SESSON: string = "REMOVE_SESSON";
export const CHANGE_SESSON_AMOUNT: string = "CHANGE_SESSON_AMOUNT";
export const CHANGE_SESSON_PENDING_EDIT: string = "CHANGE_SESSON_PENDING_EDIT";
export const CLEAR_SESSON_PENDING_EDIT: string = "CLEAR_SESSON_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addSesson(sesson: ISesson): IAddSessonActionType {
    return { type: ADD_SESSON, sesson: sesson };
}

export function editSesson(sesson: ISesson): IEditSessonActionType {
    return { type: EDIT_SESSON, sesson: sesson };
}

export function removeSesson(id: number): IRemoveSessonActionType {
    return { type: REMOVE_SESSON, id: id };
}

export function listLesson(sesson: ISesson): IListLessonSessonActionType {
    return { type: LIST_LESSON, sesson: sesson };
}

export function changeSessonAmount(id: number, amount: number): IChangeSessonAmountType {
    return { type: CHANGE_SESSON_AMOUNT, id: id, amount: amount };
}

export function changeSelectedSesson(sesson: ISesson): IChangeSelectedSessonActionType {
    return { type: CHANGE_SESSON_PENDING_EDIT, sesson: sesson };
}

export function clearSelectedSesson(): IClearSelectedSessonActionType {
    return { type: CLEAR_SESSON_PENDING_EDIT };
}

export function setModificationState(value: SessonModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSessonActionType { type: string, sesson: ISesson };
interface IEditSessonActionType { type: string, sesson: ISesson };
interface IRemoveSessonActionType { type: string, id: number };
interface IListLessonSessonActionType { type: string, sesson: ISesson };
interface IChangeSelectedSessonActionType { type: string, sesson: ISesson };
interface IClearSelectedSessonActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SessonModificationStatus};
interface IChangeSessonAmountType {type: string, id: number, amount: number};