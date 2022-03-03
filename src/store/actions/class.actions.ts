import { IClass, ClassModificationStatus } from "../models/class.interface";
export const ADD_CLASS: string = "ADD_CLASS";
export const EDIT_CLASS: string = "EDIT_CLASS";
export const REMOVE_CLASS: string = "REMOVE_CLASS";
export const CHANGE_CLASS_AMOUNT: string = "CHANGE_CLASS_AMOUNT";
export const CHANGE_CLASS_PENDING_EDIT: string = "CHANGE_CLASS_PENDING_EDIT";
export const CLEAR_CLASS_PENDING_EDIT: string = "CLEAR_CLASS_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addClass(myClass: IClass): IAddClassActionType {
    return { type: ADD_CLASS, myClass: myClass };
}

export function editClass(myClass: IClass): IEditClassActionType {
    return { type: EDIT_CLASS, myClass: myClass };
}

export function removeClass(id: number): IRemoveClassActionType {
    return { type: REMOVE_CLASS, id: id };
}

export function changeClassAmount(id: number, amount: number): IChangeClassAmountType {
    return { type: CHANGE_CLASS_AMOUNT, id: id, amount: amount };
}

export function changeSelectedClass(myClass: IClass): IChangeSelectedClassActionType {
    return { type: CHANGE_CLASS_PENDING_EDIT, myClass: myClass };
}

export function clearSelectedClass(): IClearSelectedClassActionType {
    return { type: CLEAR_CLASS_PENDING_EDIT };
}

export function setModificationState(value: ClassModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddClassActionType { type: string, myClass: IClass };
interface IEditClassActionType { type: string, myClass: IClass };
interface IRemoveClassActionType { type: string, id: number };
interface IChangeSelectedClassActionType { type: string, myClass: IClass };
interface IClearSelectedClassActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ClassModificationStatus};
interface IChangeClassAmountType {type: string, id: number, amount: number};