import { IUserState, IActionBase } from "../models/root.interface";
import { EDIT_USER, ADD_USER, REMOVE_USER } from "../actions/users.action";
import { IUser, UserModificationStatus } from "../models/user.interface";

const initialState: IUserState = {
    modificationState: UserModificationStatus.None,
    selectedUser: null,
    users: [
        { id: 1, fullName: "Nguyễn Văn Chung", email: "nvlong00@gmail.com", sex: "Nam", dateOfDay: "10/01/2000", address: "Thanh Hoa", phone: "0987123456", password: '123' },
        { id: 2, fullName: "Trần Đức Bình", email: "ohmy@fr.pl", sex: "Nam", dateOfDay: "4/10/2000", address: "Ho Chi Minh", phone: "0987123490", password: '123' }
    ],
    admins: [
        { id: 3, fullName: "Nguyễn Văn Chung", email: "jcrock@em.pl", sex: "Nam", dateOfDay: "10/01/2000", address: "Thanh Hoa", phone: "0987123456", password: '123' },
    ]
};

function userReducer(state: IUserState = initialState, action: IActionBase): IUserState {
    switch (action.type) {
        case EDIT_USER: {
            const foundIndex: number = state.admins.findIndex(pr => pr.id === action.user.id);
            let admins: IUser[] = state.admins;
            admins[foundIndex] = action.user;
            return { ...state, admins: admins };
        }
        case ADD_USER: {
            return { ...state, users: state.users.filter(x=>x.id !== action.user.id), admins: [...state.admins, action.user]};
        }
        case REMOVE_USER: {
            return { ...state, admins: state.admins.filter(x=>x.id !== action.user.id), users: [...state.users, action.user]};
        }
        default:
            return state;
    }
}

export default userReducer;