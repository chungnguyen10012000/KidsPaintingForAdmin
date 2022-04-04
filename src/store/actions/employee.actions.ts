import { IEmployee, EmployeeModificationStatus } from "../models/employee.interface";

export const EDIT_EMPLOYEE: string = "EDIT_EMPLOYEE";
export const ADD_EMPLOYEE: string = "ADD_EMPLOYEE";
export const REMOVE_EMPLOYEE: string = "REMOVE_EMPLOYEE";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const CHANGE_EMPLOYEE_PENDING_EDIT: string = "CHANGE_EMPLOYEE_PENDING_EDIT";
export const CLEAR_EMPLOYEE_PENDING_EDIT: string = "CLEAR_EMPLOYEE_PENDING_EDIT";

export function addEmployee(employee: IEmployee): IAddEmployeeActionType {
    return { type: ADD_EMPLOYEE, employee: employee };
}

export function removeEmployee(id: number): IRemoveEmployeeActionType {
    return { type: REMOVE_EMPLOYEE, id: id };
}

export function editEmployee(employee: IEmployee): IEditEmployeeActionType {
    return { type: EDIT_EMPLOYEE, employee: employee };
}

export function setModificationState(value: EmployeeModificationStatus): ISetModificationStateActionEmployee {
    return { type: SET_MODIFICATION_STATE, value: value };
}

export function changeSelectedEmployee(employee: IEmployee): IChangeSelectedEmployeeActionType {
    return { type: CHANGE_EMPLOYEE_PENDING_EDIT, employee: employee };
}

export function clearSelectedEmployee(): IClearSelectedEmployeeActionType {
    return { type: CLEAR_EMPLOYEE_PENDING_EDIT };
}



interface IEditEmployeeActionType { type: string, employee: IEmployee };
interface IAddEmployeeActionType { type: string, employee: IEmployee };
interface IRemoveEmployeeActionType { type: string, id: number };
interface ISetModificationStateActionEmployee { type: string, value:  EmployeeModificationStatus};
interface IChangeSelectedEmployeeActionType { type: string, employee: IEmployee };
interface IClearSelectedEmployeeActionType { type: string };

