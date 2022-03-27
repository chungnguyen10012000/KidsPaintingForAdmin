import { IUserState, IActionBase } from "../models/root.interface";
import { EDIT_USER, ADD_USER, REMOVE_USER } from "../actions/users.action";
import { IUser, UserModificationStatus } from "../models/user.interface";

const initialState: IUserState = {
    modificationState: UserModificationStatus.None,
    selectedUser: null,
    users: [
        { id: 1, firstName: "Nguyễn", lastName: "Chung", email: "nvlong00@gmail.com", username: 'nvchung00', sex: "Nam", dateOfDay: "10/01/2000", address: "Thanh Hoa", phone: "0987123456", password: '123', userStatus: true, avatar: '' },
        { id: 2, firstName: "Trần", lastName: 'Binh', email: "ohmy@fr.pl", username: 'binhtranh2k', sex: "Nam", dateOfDay: "4/10/2000", address: "Ho Chi Minh", phone: "0987123490", password: '123', userStatus: true, avatar: '' }
    ],
    admins: [
        { id: 1, firstName: "Nguyễn", lastName: "Chung", email: "nvlong00@gmail.com", username: 'nvchung00', sex: "Nam", dateOfDay: "10/01/2000", address: "Thanh Hoa", phone: "0987123456", password: '123', userStatus: true, avatar: '' },
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
            let maxId: number = Math.max.apply(Math, state.users.map(function(o) { return o.id; }));
            action.user.id = maxId + 1;
            return { ...state, users: [...state.users, action.user]};
        }
        case REMOVE_USER: {
            return { ...state, users: state.users.filter(pr => pr.id !== action.id) };
        }
        default:
            return state;
    }
}

export default userReducer;