import { IContest, ContestModificationStatus } from "../models/contest.interface";
export const ADD_CONTEST: string = "ADD_CONTEST";
export const EDIT_CONTEST: string = "EDIT_CONTEST";
export const REMOVE_CONTEST: string = "REMOVE_CONTEST";
export const CHANGE_CONTEST_AMOUNT: string = "CHANGE_CONTEST_AMOUNT";
export const CHANGE_CONTEST_PENDING_EDIT: string = "CHANGE_CONTEST_PENDING_EDIT";
export const CLEAR_CONTEST_PENDING_EDIT: string = "CLEAR_CONTEST_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addContest(contest: IContest): IAddContestActionType {
    return { type: ADD_CONTEST, contest: contest };
}

export function editContest(contest: IContest): IEditContestActionType {
    return { type: EDIT_CONTEST, contest: contest };
}

export function removeContest(id: number): IRemoveContestActionType {
    return { type: REMOVE_CONTEST, id: id };
}

export function changeContestAmount(id: number, amount: number): IChangeContestAmountType {
    return { type: CHANGE_CONTEST_AMOUNT, id: id, amount: amount };
}

export function changeSelectedContest(contest: IContest): IChangeSelectedContestActionType {
    return { type: CHANGE_CONTEST_PENDING_EDIT, contest: contest };
}

export function clearSelectedContest(): IClearSelectedContestActionType {
    return { type: CLEAR_CONTEST_PENDING_EDIT };
}

export function setModificationState(value: ContestModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddContestActionType { type: string, contest: IContest };
interface IEditContestActionType { type: string, contest: IContest };
interface IRemoveContestActionType { type: string, id: number };
interface IChangeSelectedContestActionType { type: string, contest: IContest };
interface IClearSelectedContestActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ContestModificationStatus};
interface IChangeContestAmountType {type: string, id: number, amount: number};