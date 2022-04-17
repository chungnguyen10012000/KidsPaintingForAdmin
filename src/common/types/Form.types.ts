import { IProduct } from "../../store/models/product.interface";

export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface IUserFormState {
    firstName: IFormStateField<string>;
    lastName: IFormStateField<string>;
    avatar: IFormStateField<string>;
    username: IFormStateField<string>;
    email: IFormStateField<string>;
    sex: IFormStateField<string>;
    dateOfDay:  IFormStateField<string>;
    address: IFormStateField<string>;
    phone: IFormStateField<string>;
    password: IFormStateField<string>;
}

export interface IBlogFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
}

export interface ICourseFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    price: IFormStateField<number>; 
    art_type_id: IFormStateField<number>;
    art_level_id: IFormStateField<number>;
    max_participant: IFormStateField<number>; 
    sum_of_section: IFormStateField<number>; 
    image_url: IFormStateField<string>;
    is_enabled: IFormStateField<boolean>;
}

export interface ICourseSemesterFormState {
    course_id: IFormStateField<number>;
    schedule_id: IFormStateField<number>;
}

export interface ISemesterFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    year: IFormStateField<string>;
    number: IFormStateField<number>;
    start_time: IFormStateField<string>;
    end_time: IFormStateField<string>;
}

export interface ILessonTimeFormState {
    start_time: IFormStateField<string>;
    end_time: IFormStateField<string>;
}

export interface IScheduleFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
}

export interface IScheduleItemFormState {
    schedule_id: IFormStateField<number>;
    lesson_time: IFormStateField<number>;
    date_of_week: IFormStateField<number>;
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
    art_type_id: IFormStateField<number>;
    art_level_id: IFormStateField<number>;
    is_enabled: IFormStateField<boolean>;
    max_participant: IFormStateField<number>;
    start_time: IFormStateField<string>;
    end_time: IFormStateField<string>;
    image_url: IFormStateField<string>;
}

export  interface IOrderFormState {
    name: IFormStateField<string>;
    product: IFormStateField<IProduct | null>;
    amount: IFormStateField<number>;
    totalPrice: IFormStateField<number>;
};