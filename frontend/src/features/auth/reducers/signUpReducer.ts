import {
    AuthAction,
    CREATE_ACCOUNT_REQUESTED,
    CREATE_ACCOUNT_SUCCEEDED,
    CREATE_ACCOUNT_FAILED,
} from '../actions/authenticationActions';
import { SignUpState } from '../models/auth';

const defaultState = {
    message: '',
    failed: false,
    isFetching: false,
    succeeded: false,
};

export const signUp = (state: SignUpState = defaultState, action: AuthAction) => {
    switch (action.type) {
        case CREATE_ACCOUNT_REQUESTED:
            return {
                ...defaultState,
                isFetching: true,
            };
        case CREATE_ACCOUNT_SUCCEEDED:
            return {
                ...defaultState,
                succeeded: true,
            };
        case CREATE_ACCOUNT_FAILED:
            return {
                ...defaultState,
                message: action.payload,
                failed: true,
            };
        default:
            return state;
    }
};
