import { IUserState, IActionBase } from "../../models/root.interface";
import { EDIT_USER, ADD_USER, REMOVE_USER, FETCH_DATA_ERROR as FETCH_DATA_USER_ERROR, FETCH_DATA_REQUEST as FETCH_DATA_USER_REQUEST, FETCH_DATA_SUCCESS as FETCH_DATA_USER_SUCCESS } from "../../actions/users/users.action";
import { IUser, UserModificationStatus } from "../../models/user.interface";

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
        case FETCH_DATA_USER_REQUEST:{
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case FETCH_DATA_USER_SUCCESS:{
            return {
                ...state,
                loading: false,
                users: action.user
            };
        }
        case FETCH_DATA_USER_ERROR:{
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                users: []
            };
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
        default:
            return state;
    }
}

export default userReducer;