import { ILevel, LevelModificationStatus } from "../models/levels.interface";
export const ADD_LEVEL: string = "ADD_LEVEL";
export const EDIT_LEVEL: string = "EDIT_LEVEL";
export const REMOVE_LEVEL: string = "REMOVE_LEVEL";
export const CHANGE_LEVEL_AMOUNT: string = "CHANGE_LEVEL_AMOUNT";
export const CHANGE_LEVEL_PENDING_EDIT: string = "CHANGE_LEVEL_PENDING_EDIT";
export const CLEAR_LEVEL_PENDING_EDIT: string = "CLEAR_LEVEL_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_LEVEL_ALL: string = "REMOVE_LEVEL_ALL";
export const INITIAL_LEVEL: string = "INITIAL_LEVEL";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(level: ILevel) {
    return {
        type: FETCH_DATA_SUCCESS,
        level
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialLevel(level: ILevel): IInitialLevelActionType {
    return { type: INITIAL_LEVEL, level: level };
}

export function removeLevelAll(): IRemoveLevelAllActionType {
    return { type: REMOVE_LEVEL_ALL };
}

export function addLevel(level: ILevel): IAddLevelActionType {
    return { type: ADD_LEVEL, level: level };
}

export function editLevel(level: ILevel): IEditLevelActionType {
    return { type: EDIT_LEVEL, level: level };
}

export function removeLevel(id: number): IRemoveLevelActionType {
    return { type: REMOVE_LEVEL, id: id };
}

export function changeLevelAmount(id: number, amount: number): IChangeLevelAmountType {
    return { type: CHANGE_LEVEL_AMOUNT, id: id, amount: amount };
}

export function changeSelectedLevel(level: ILevel): IChangeSelectedLevelActionType {
    return { type: CHANGE_LEVEL_PENDING_EDIT, level: level };
}

export function clearSelectedLevel(): IClearSelectedLevelActionType {
    return { type: CLEAR_LEVEL_PENDING_EDIT };
}

export function setModificationStateLevel(value: LevelModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddLevelActionType { type: string, level: ILevel };
interface IEditLevelActionType { type: string, level: ILevel };
interface IRemoveLevelActionType { type: string, id: number };
interface IChangeSelectedLevelActionType { type: string, level: ILevel };
interface IClearSelectedLevelActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  LevelModificationStatus};
interface IChangeLevelAmountType {type: string, id: number, amount: number};
interface IRemoveLevelAllActionType { type: string }
interface IInitialLevelActionType {type: string, level: ILevel}