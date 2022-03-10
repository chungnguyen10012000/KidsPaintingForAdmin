import { IMytype, MytypeModificationStatus } from "../models/mytypes.interface";
export const ADD_MYTYPE: string = "ADD_MYTYPE";
export const EDIT_MYTYPE: string = "EDIT_MYTYPE";
export const REMOVE_MYTYPE: string = "REMOVE_MYTYPE";
export const CHANGE_MYTYPE_AMOUNT: string = "CHANGE_MYTYPE_AMOUNT";
export const CHANGE_MYTYPE_PENDING_EDIT: string = "CHANGE_MYTYPE_PENDING_EDIT";
export const CLEAR_MYTYPE_PENDING_EDIT: string = "CLEAR_MYTYPE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addMytype(mytype: IMytype): IAddMytypeActionType {
    return { type: ADD_MYTYPE, mytype: mytype };
}

export function editMytype(mytype: IMytype): IEditMytypeActionType {
    return { type: EDIT_MYTYPE, mytype: mytype };
}

export function removeMytype(id: number): IRemoveMytypeActionType {
    return { type: REMOVE_MYTYPE, id: id };
}

export function changeMytypeAmount(id: number, amount: number): IChangeMytypeAmountType {
    return { type: CHANGE_MYTYPE_AMOUNT, id: id, amount: amount };
}

export function changeSelectedMytype(mytype: IMytype): IChangeSelectedMytypeActionType {
    return { type: CHANGE_MYTYPE_PENDING_EDIT, mytype: mytype };
}

export function clearSelectedMytype(): IClearSelectedMytypeActionType {
    return { type: CLEAR_MYTYPE_PENDING_EDIT };
}

export function setModificationStateMytype(value: MytypeModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddMytypeActionType { type: string, mytype: IMytype };
interface IEditMytypeActionType { type: string, mytype: IMytype };
interface IRemoveMytypeActionType { type: string, id: number };
interface IChangeSelectedMytypeActionType { type: string, mytype: IMytype };
interface IClearSelectedMytypeActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  MytypeModificationStatus};
interface IChangeMytypeAmountType {type: string, id: number, amount: number};