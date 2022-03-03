import { ICourse, CourseModificationStatus } from "../models/courses.interface";
export const ADD_COURSE: string = "ADD_COURSE";
export const EDIT_COURSE: string = "EDIT_COURSE";
export const REMOVE_COURSE: string = "REMOVE_COURSE";
export const CHANGE_COURSE_AMOUNT: string = "CHANGE_COURSE_AMOUNT";
export const CHANGE_COURSE_PENDING_EDIT: string = "CHANGE_COURSE_PENDING_EDIT";
export const CLEAR_COURSE_PENDING_EDIT: string = "CLEAR_COURSE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addCourse(course: ICourse): IAddCourseActionType {
    return { type: ADD_COURSE, course: course };
}

export function editCourse(course: ICourse): IEditCourseActionType {
    return { type: EDIT_COURSE, course: course };
}

export function removeCourse(id: number): IRemoveCourseActionType {
    return { type: REMOVE_COURSE, id: id };
}

export function changeCourseAmount(id: number, amount: number): IChangeCourseAmountType {
    return { type: CHANGE_COURSE_AMOUNT, id: id, amount: amount };
}

export function changeSelectedCourse(course: ICourse): IChangeSelectedCourseActionType {
    return { type: CHANGE_COURSE_PENDING_EDIT, course: course };
}

export function clearSelectedCourse(): IClearSelectedCourseActionType {
    return { type: CLEAR_COURSE_PENDING_EDIT };
}

export function setModificationState(value: CourseModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCourseActionType { type: string, course: ICourse };
interface IEditCourseActionType { type: string, course: ICourse };
interface IRemoveCourseActionType { type: string, id: number };
interface IChangeSelectedCourseActionType { type: string, course: ICourse };
interface IClearSelectedCourseActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CourseModificationStatus};
interface IChangeCourseAmountType {type: string, id: number, amount: number};