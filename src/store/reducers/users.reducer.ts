import { IUserState, IActionBase } from "../models/root.interface";
import { ADD_ADMIN, REMOVE_ADMIN } from "../actions/users.action";

const initialState: IUserState = {
    users: [
        { id: 1, fullName: "Nguyễn Văn Chung", email: "nvlong00@gmail.com", },
        { id: 2, fullName: "Trần Đức Bình", email: "ohmy@fr.pl" }
    ],
    admins: [
        { id: 3, fullName: "Nguyễn Văn Chung", email: "jcrock@em.pl" },
    ]
};

function userReducer(state: IUserState = initialState, action: IActionBase): IUserState {
    switch (action.type) {
        case ADD_ADMIN: {
            return { ...state, users: state.users.filter(x=>x.id !== action.user.id), admins: [...state.admins, action.user]};
        }
        case REMOVE_ADMIN: {
            return { ...state, admins: state.admins.filter(x=>x.id !== action.user.id), users: [...state.users, action.user]};
        }
        default:
            return state;
    }
}

export default userReducer;