import { IProduct } from "../../store/models/product.interface";

export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface IUserFormState {
    fullName: IFormStateField<string>;
    email: IFormStateField<string>;
    sex: IFormStateField<string>;
    dateOfDay:  IFormStateField<string>;
    address: IFormStateField<string>;
    phone: IFormStateField<string>;
    password: IFormStateField<string>;
}

export interface ICourseFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    type: IFormStateField<string>;
    level: IFormStateField<string>;
    price: IFormStateField<number>; 
    amount: IFormStateField<number>; 
}

export interface IMytypeFormState {
    name: IFormStateField<string>;
}
export interface ILevelFormState {
    name: IFormStateField<string>;
}

export interface IMyClassFormState {
    name: IFormStateField<string>;
    course: IFormStateField<string>;
    teacher_id: IFormStateField<string>;
    amount: IFormStateField<number>;
}

export interface ISessonFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    startTime: IFormStateField<string>;
    endTime: IFormStateField<string>;
    currentDay: IFormStateField<string>;
}

export interface IExerciseFormState {
    name: IFormStateField<string>;
    body: IFormStateField<string>;
    weight: IFormStateField<number>;
    maxSubmit: IFormStateField<number>;
}

export interface IClassFormState {
    name: IFormStateField<string>;
    course: IFormStateField<number>;
    teacher_id: IFormStateField<number>;
    amount: IFormStateField<number>;
}

export interface IContestFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    type: IFormStateField<string>;
    level: IFormStateField<string>;
    status: IFormStateField<string>;
    amount: IFormStateField<number>;
    hasBeginDate: IFormStateField<string>;
    hasExpiryDate: IFormStateField<string>;
}

export  interface IOrderFormState {
    name: IFormStateField<string>;
    product: IFormStateField<IProduct | null>;
    amount: IFormStateField<number>;
    totalPrice: IFormStateField<number>;
};