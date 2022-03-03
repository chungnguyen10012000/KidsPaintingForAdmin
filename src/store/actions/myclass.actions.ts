import { IMyClass, MyClassModificationStatus } from "../models/myclass.interface";
export const ADD_MYCLASS: string = "ADD_MYCLASS";
export const EDIT_MYCLASS: string = "EDIT_MYCLASS";
export const REMOVE_MYCLASS: string = "REMOVE_MYCLASS";
export const CHANGE_MYCLASS_AMOUNT: string = "CHANGE_MYCLASS_AMOUNT";
export const CHANGE_MYCLASS_PENDING_EDIT: string = "CHANGE_MYCLASS_PENDING_EDIT";
export const CLEAR_MYCLASS_PENDING_EDIT: string = "CLEAR_MYCLASS_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addMyClass(myclass: IMyClass): IAddMyClassActionType {
    return { type: ADD_MYCLASS, myclass: myclass };
}

export function editMyClass(myclass: IMyClass): IEditMyClassActionType {
    return { type: EDIT_MYCLASS, myclass: myclass };
}

export function removeMyClass(id: number): IRemoveMyClassActionType {
    return { type: REMOVE_MYCLASS, id: id };
}

export function changeMyClassAmount(id: number, amount: number): IChangeMyClassAmountType {
    return { type: CHANGE_MYCLASS_AMOUNT, id: id, amount: amount };
}

export function changeSelectedMyClass(myclass: IMyClass): IChangeSelectedMyClassActionType {
    return { type: CHANGE_MYCLASS_PENDING_EDIT, myclass: myclass };
}

export function clearSelectedMyClass(): IClearSelectedMyClassActionType {
    return { type: CLEAR_MYCLASS_PENDING_EDIT };
}

export function setModificationState(value: MyClassModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddMyClassActionType { type: string, myclass: IMyClass };
interface IEditMyClassActionType { type: string, myclass: IMyClass };
interface IRemoveMyClassActionType { type: string, id: number };
interface IChangeSelectedMyClassActionType { type: string, myclass: IMyClass };
interface IClearSelectedMyClassActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  MyClassModificationStatus};
interface IChangeMyClassAmountType {type: string, id: number, amount: number};