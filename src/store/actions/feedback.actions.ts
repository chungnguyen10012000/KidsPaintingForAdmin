import { IFeedBack, FeedBackModificationStatus } from "../models/feedback.interface";

export const EDIT_FEEDBACK: string = "EDIT_FEEDBACK";
export const ADD_FEEDBACK: string = "ADD_FEEDBACK";
export const REMOVE_FEEDBACK: string = "REMOVE_FEEDBACK";
export const REMOVE_FEEDBACK_WAIT: string = "REMOVE_FEEDBACK_WAIT"
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const CHANGE_FEEDBACK_PENDING_EDIT: string = "CHANGE_FEEDBACK_PENDING_EDIT";
export const CLEAR_FEEDBACK_PENDING_EDIT: string = "CLEAR_FEEDBACK_PENDING_EDIT";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const INITIAL_FEEDBACK: string = "INITIAL_FEEDBACK";
export const REMOVE_FEEDBACK_ALL: string = "REMOVE_FEEDBACK_ALL"


export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(feedback: IFeedBack) {
    return {
        type: FETCH_DATA_SUCCESS,
        feedback
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialFeedback(feedback: IFeedBack): IInitialFeedbackActionType {
    return { type: INITIAL_FEEDBACK, feedback: feedback };
}

export function removeFeedbackAll(): IRemoveFeedbackAllActionType {
    return { type: REMOVE_FEEDBACK_ALL };
}

export function addFeedback(feedback: IFeedBack): IAddFeedbackActionType {
    return { type: ADD_FEEDBACK, feedback: feedback };
}

export function removeFeedback(id: number): IRemoveFeedbackActionType {
    return { type: REMOVE_FEEDBACK, id: id };
}

export function removeFeedbackWait(id: number): IRemoveFeedbackActionType{
    return { type: REMOVE_FEEDBACK_WAIT, id: id };
}

export function editFeedback(feedback: IFeedBack): IEditFeedbackActionType {
    return { type: EDIT_FEEDBACK, feedback: feedback };
}

export function setModificationState(value: FeedBackModificationStatus): ISetModificationStateActionFeedback {
    return { type: SET_MODIFICATION_STATE, value: value };
}

export function changeSelectedFeedback(feedback: IFeedBack): IChangeSelectedFeedbackActionType {
    return { type: CHANGE_FEEDBACK_PENDING_EDIT, feedback: feedback };
}

export function clearSelectedFeedback(): IClearSelectedFeedbackActionType {
    return { type: CLEAR_FEEDBACK_PENDING_EDIT };
}



interface IEditFeedbackActionType { type: string, feedback: IFeedBack };
interface IAddFeedbackActionType { type: string, feedback: IFeedBack };
interface IRemoveFeedbackActionType { type: string, id: number };
interface ISetModificationStateActionFeedback { type: string, value:  FeedBackModificationStatus};
interface IChangeSelectedFeedbackActionType { type: string, feedback: IFeedBack };
interface IClearSelectedFeedbackActionType { type: string };
interface IInitialFeedbackActionType {type: string, feedback: IFeedBack}
interface IRemoveFeedbackAllActionType { type: string }

