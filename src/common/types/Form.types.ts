import { IProduct } from "../../store/models/product.interface";

export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface IProductFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    amount: IFormStateField<number>;
    price: IFormStateField<number>;
    hasExpiryDate: IFormStateField<boolean>; 
    category: IFormStateField<string>;
}

export interface ICourseFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    type: IFormStateField<string>;
    level: IFormStateField<string>;
    price: IFormStateField<number>; 
}

export interface IMyClassFormState {
    name: IFormStateField<string>;
    course: IFormStateField<number>;
    teacher_id: IFormStateField<number>;
    amount: IFormStateField<number>;
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