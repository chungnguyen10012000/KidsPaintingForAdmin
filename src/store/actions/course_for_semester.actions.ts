import { ICourseSemester, CourseSemesterModificationStatus } from "../models/course_for_semester.interface";
export const ADD_COURSE_SEMESTER: string = "ADD_COURSE_SEMESTER";
export const EDIT_COURSE_SEMESTER: string = "EDIT_COURSE_SEMESTER";
export const REMOVE_COURSE_SEMESTER: string = "REMOVE_COURSE_SEMESTER";
export const CHANGE_COURSE_SEMESTER_AMOUNT: string = "CHANGE_COURSE_SEMESTER_AMOUNT";
export const CHANGE_COURSE_SEMESTER_PENDING_EDIT: string = "CHANGE_COURSE_SEMESTER_PENDING_EDIT";
export const CLEAR_COURSE_SEMESTER_PENDING_EDIT: string = "CLEAR_COURSE_SEMESTER_PENDING_EDIT";
export const SET_MODIFICATION_STATE_SEMESTER: string = "SET_MODIFICATION_STATE_SEMESTER";

export function addCourseSemester(courseSemester: ICourseSemester): IAddCourseSemesterActionType {
    return { type: ADD_COURSE_SEMESTER, courseSemester: courseSemester };
}

export function editCourseSemester(courseSemester: ICourseSemester): IEditCourseSemesterActionType {
    return { type: EDIT_COURSE_SEMESTER, courseSemester: courseSemester };
}

export function removeCourseSemester(id: number): IRemoveCourseSemesterActionType {
    return { type: REMOVE_COURSE_SEMESTER, id: id };
}

export function changeCourseSemesterAmount(id: number, amount: number): IChangeCourseSemesterAmountType {
    return { type: CHANGE_COURSE_SEMESTER_AMOUNT, id: id, amount: amount };
}

export function changeSelectedCourseSemester(courseSemester: ICourseSemester): IChangeSelectedCourseSemesterActionType {
    return { type: CHANGE_COURSE_SEMESTER_PENDING_EDIT, courseSemester: courseSemester };
}

export function clearSelectedCourseSemester(): IClearSelectedCourseSemesterActionType {
    return { type: CLEAR_COURSE_SEMESTER_PENDING_EDIT };
}

export function setModificationStateSemester(value: CourseSemesterModificationStatus): ISetModificationStateActionTypeSemester {
    return { type: SET_MODIFICATION_STATE_SEMESTER, value: value };
}

interface IAddCourseSemesterActionType { type: string, courseSemester: ICourseSemester };
interface IEditCourseSemesterActionType { type: string, courseSemester: ICourseSemester };
interface IRemoveCourseSemesterActionType { type: string, id: number };
interface IChangeSelectedCourseSemesterActionType { type: string, courseSemester: ICourseSemester };
interface IClearSelectedCourseSemesterActionType { type: string };
interface ISetModificationStateActionTypeSemester { type: string, value:  CourseSemesterModificationStatus};
interface IChangeCourseSemesterAmountType {type: string, id: number, amount: number};