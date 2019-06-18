import { LOGIN_FAIL, LOGIN_REQUESTED, LOGIN_SUCCEEDED } from '../actions/authenticationActions';
import { AuthState } from '../models/auth';

const defaultState = {
    failed: false,
    isAuthenticated: localStorage.getItem('jwt') ? true : false,
    isFetching: false,
    message: '',
};

export const authentication = (state: AuthState = defaultState, action: any) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return {
                ...state,
                failed: false,
                isAuthenticated: false,
                isFetching: true,
            };
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                failed: false,
                isAuthenticated: true,
                isFetching: false,
                message: action.payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                failed: true,
                isAuthenticated: false,
                isFetching: false,
                message: action.payload,
            };
        default:
            return state;
    }
};
