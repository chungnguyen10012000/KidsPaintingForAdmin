import { IEmployeeState, IActionBase } from "../models/root.interface";
import { EDIT_EMPLOYEE, ADD_EMPLOYEE, REMOVE_EMPLOYEE } from "../actions/employee.actions";
import { IEmployee, EmployeeModificationStatus } from "../models/employee.interface";

const initialState: IEmployeeState = {
    modificationState: EmployeeModificationStatus.None,
    selectedUser: null,
    employees: [
        { id: 1, firstName: "Nguyễn", lastName: "A", email: "nvlong00@gmail.com", username: 'bk2k123', sex: "Nam", dateOfDay: "10/01/2000", address: "Thanh Hoa", phone: "0987123456", password: '123', userStatus: true, avatar: '' },
        { id: 2, firstName: "Trần", lastName: 'B', email: "ohmy@fr.pl", username: 'bk2k1123', sex: "Nam", dateOfDay: "4/10/2000", address: "Ho Chi Minh", phone: "0987123490", password: '123', userStatus: true, avatar: '' }
    ],
    admins: [
        { id: 1, firstName: "Nguyễn", lastName: "D", email: "nvlong00@gmail.com", username: 'bkxxx123', sex: "Nam", dateOfDay: "10/01/2000", address: "Thanh Hoa", phone: "0987123456", password: '123', userStatus: true, avatar: '' },
    ]
};

function employeeReducer(state: IEmployeeState = initialState, action: IActionBase): IEmployeeState {
    switch (action.type) {
        case EDIT_EMPLOYEE: {
            const foundIndex: number = state.admins.findIndex(pr => pr.id === action.employees.id);
            let admins: IEmployee[] = state.admins;
            admins[foundIndex] = action.employees;
            return { ...state, admins: admins };
        }
        case ADD_EMPLOYEE: {
            let maxId: number = Math.max.apply(Math, state.employees.map(function(o) { return o.id; }));
            action.employee.id = maxId + 1;
            return { ...state, employees: [...state.employees, action.employee]};
        }
        case REMOVE_EMPLOYEE: {
            return { ...state, employees: state.employees.filter(pr => pr.id !== action.id) };
        }
        default:
            return state;
    }
}

export default employeeReducer;