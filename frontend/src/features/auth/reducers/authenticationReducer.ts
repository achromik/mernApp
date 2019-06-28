import {
    LOGIN_FAILED,
    LOGIN_REQUESTED,
    LOGIN_SUCCEEDED,
    LOGOUT_REQUESTED,
    LOGOUT_SUCCEEDED,
    LOGOUT_FAILED,
    AuthAction,
} from '../actions/authenticationActions';
import { AuthState } from '../models/auth';

const defaultState = {
    failed: false,
    isAuthenticated: localStorage.getItem('jwt') ? true : false,
    isFetching: false,
    message: '',
};

export const authentication = (state: AuthState = defaultState, action: AuthAction) => {
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
        case LOGIN_FAILED:
            return {
                ...state,
                failed: true,
                isAuthenticated: false,
                isFetching: false,
                message: action.payload,
            };
        case LOGOUT_REQUESTED:
            return {
                ...state,
                failed: false,
                isFetching: true,
                message: '',
            };
        case LOGOUT_SUCCEEDED:
            return {
                ...state,
                failed: false,
                isAuthenticated: false,
                isFetching: false,
                message: action.payload,
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                failed: true,
                isFetching: false,
                message: action.payload,
            };
        default:
            return state;
    }
};
