import { IExercise, ExerciseModificationStatus } from "../models/exercise.interface";
export const ADD_EXERCISE: string = "ADD_EXERCISE";
export const EDIT_EXERCISE: string = "EDIT_EXERCISE";
export const REMOVE_EXERCISE: string = "REMOVE_EXERCISE";
export const CHANGE_EXERCISE_AMOUNT: string = "CHANGE_EXERCISE_AMOUNT";
export const CHANGE_EXERCISE_PENDING_EDIT: string = "CHANGE_EXERCISE_PENDING_EDIT";
export const CLEAR_EXERCISE_PENDING_EDIT: string = "CLEAR_EXERCISE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addExercise(exercise: IExercise): IAddExerciseActionType {
    return { type: ADD_EXERCISE, exercise: exercise };
}

export function editExercise(exercise: IExercise): IEditExerciseActionType {
    return { type: EDIT_EXERCISE, exercise: exercise };
}

export function removeExercise(id: number): IRemoveExerciseActionType {
    return { type: REMOVE_EXERCISE, id: id };
}

export function changeExerciseAmount(id: number, amount: number): IChangeExerciseAmountType {
    return { type: CHANGE_EXERCISE_AMOUNT, id: id, amount: amount };
}

export function changeSelectedExercise(exercise: IExercise): IChangeSelectedExerciseActionType {
    return { type: CHANGE_EXERCISE_PENDING_EDIT, exercise: exercise };
}

export function clearSelectedExercise(): IClearSelectedExerciseActionType {
    return { type: CLEAR_EXERCISE_PENDING_EDIT };
}

export function setModificationState(value: ExerciseModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddExerciseActionType { type: string, exercise: IExercise };
interface IEditExerciseActionType { type: string, exercise: IExercise };
interface IRemoveExerciseActionType { type: string, id: number };
interface IChangeSelectedExerciseActionType { type: string, exercise: IExercise };
interface IClearSelectedExerciseActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  ExerciseModificationStatus};
interface IChangeExerciseAmountType {type: string, id: number, amount: number};