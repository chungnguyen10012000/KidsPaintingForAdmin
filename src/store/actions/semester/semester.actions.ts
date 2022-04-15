import { ISemester, SemesterModificationStatus } from "../../models/semester.interface";
export const ADD_SEMESTER: string = "ADD_SEMESTER";
export const EDIT_SEMESTER: string = "EDIT_SEMESTER";
export const REMOVE_SEMESTER: string = "REMOVE_SEMESTER";
export const CHANGE_SEMESTER_AMOUNT: string = "CHANGE_SEMESTER_AMOUNT";
export const CHANGE_SEMESTER_PENDING_EDIT: string = "CHANGE_SEMESTER_PENDING_EDIT";
export const CLEAR_SEMESTER_PENDING_EDIT: string = "CLEAR_SEMESTER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addSemester(semester: ISemester): IAddSemesterActionType {
    return { type: ADD_SEMESTER, semester: semester };
}

export function editSemester(semester: ISemester): IEditSemesterActionType {
    return { type: EDIT_SEMESTER, semester: semester };
}

export function removeSemester(id: number): IRemoveSemesterActionType {
    return { type: REMOVE_SEMESTER, id: id };
}

export function changeSemesterAmount(id: number, amount: number): IChangeSemesterAmountType {
    return { type: CHANGE_SEMESTER_AMOUNT, id: id, amount: amount };
}

export function changeSelectedSemester(semester: ISemester): IChangeSelectedSemesterActionType {
    return { type: CHANGE_SEMESTER_PENDING_EDIT, semester: semester };
}

export function clearSelectedSemester(): IClearSelectedSemesterActionType {
    return { type: CLEAR_SEMESTER_PENDING_EDIT };
}

export function setModificationState(value: SemesterModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddSemesterActionType { type: string, semester: ISemester };
interface IEditSemesterActionType { type: string, semester: ISemester };
interface IRemoveSemesterActionType { type: string, id: number };
interface IChangeSelectedSemesterActionType { type: string, semester: ISemester };
interface IClearSelectedSemesterActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  SemesterModificationStatus};
interface IChangeSemesterAmountType {type: string, id: number, amount: number};