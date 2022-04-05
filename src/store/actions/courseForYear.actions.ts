import { ICourseForYear, CourseForYearModificationStatus } from "../models/courseForYear.interface";
export const ADD_COURSE_FOR_YEAR: string = "ADD_COURSE_FOR_YEAR";
export const EDIT_COURSE_FOR_YEAR: string = "EDIT_COURSE_FOR_YEAR";
export const REMOVE_COURSE_FOR_YEAR: string = "REMOVE_COURSE_FOR_YEAR";
export const CHANGE_COURSE_FOR_YEAR_AMOUNT: string = "CHANGE_COURSE_FOR_YEAR_AMOUNT";
export const CHANGE_COURSE_FOR_YEAR_PENDING_EDIT: string = "CHANGE_COURSE_FOR_YEAR_PENDING_EDIT";
export const CLEAR_COURSE_FOR_YEAR_PENDING_EDIT: string = "CLEAR_COURSE_FOR_YEAR_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addCourseForYear(courseforyear: ICourseForYear): IAddCourseForYearActionType {
    return { type: ADD_COURSE_FOR_YEAR, courseforyear: courseforyear };
}

export function editCourseForYear(courseforyear: ICourseForYear): IEditCourseForYearActionType {
    return { type: EDIT_COURSE_FOR_YEAR, courseforyear: courseforyear };
}

export function removeCourseForYear(id: number): IRemoveCourseForYearActionType {
    return { type: REMOVE_COURSE_FOR_YEAR, id: id };
}

export function changeCourseForYearAmount(id: number, amount: number): IChangeCourseForYearAmountType {
    return { type: CHANGE_COURSE_FOR_YEAR_AMOUNT, id: id, amount: amount };
}

export function changeSelectedCourseForYear(courseforyear: ICourseForYear): IChangeSelectedCourseForYearActionType {
    return { type: CHANGE_COURSE_FOR_YEAR_PENDING_EDIT, courseforyear: courseforyear };
}

export function clearSelectedCourseForYear(): IClearSelectedCourseForYearActionType {
    return { type: CLEAR_COURSE_FOR_YEAR_PENDING_EDIT };
}

export function setModificationStateCourseForYear(value: CourseForYearModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCourseForYearActionType { type: string, courseforyear: ICourseForYear };
interface IEditCourseForYearActionType { type: string, courseforyear: ICourseForYear };
interface IRemoveCourseForYearActionType { type: string, id: number };
interface IChangeSelectedCourseForYearActionType { type: string, courseforyear: ICourseForYear };
interface IClearSelectedCourseForYearActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CourseForYearModificationStatus};
interface IChangeCourseForYearAmountType {type: string, id: number, amount: number};