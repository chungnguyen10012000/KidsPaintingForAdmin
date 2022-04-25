import { IUserState, IActionBase } from "../models/root.interface";
import { EDIT_USER, ADD_USER, REMOVE_USER, INITIAL_USER, REMOVE_USER_ALL, SET_MODIFICATION_STATE } from "../actions/users.action";
import { IUser, UserModificationStatus } from "../models/user.interface";

const initialState: IUserState = {
    modificationState: UserModificationStatus.None,
    selectedUser: null,
    loading: false,
    error: null,
    users: []
}

function userReducer(state: IUserState = initialState, action: IActionBase): IUserState {
    // console.log('enter reducer')
    // console.log(action)
    switch (action.type) {
        case INITIAL_USER: {
            let maxId: number = 0;
            action.user.id = maxId + 1;
            return { ...state, users : [...state.users, action.user]};
        }
        case EDIT_USER: {
            const foundIndex: number = state.users.findIndex(pr => pr.id === action.user.id);
            let users: IUser[] = state.users;
            users[foundIndex] = action.user;
            return { ...state, users: users };
        }
        case ADD_USER: {
            let maxId: number = Math.max.apply(Math, state.users.map(function (o) { return o.id; }));
            action.user.id = maxId + 1;
            return { ...state, users: [...state.users, action.user] };
        }
        case REMOVE_USER: {
            return { ...state, users: state.users.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_USER_ALL: {
            return { ...state, users: [] };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default userReducer;