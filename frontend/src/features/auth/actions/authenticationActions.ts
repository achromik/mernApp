import { Action, creator } from '@src/config/rootAction';

import { Credentials, RegistrationData } from '../models/auth';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export type LoginRequestAction = Action<typeof LOGIN_REQUESTED, Credentials>;
export const loginRequest = creator<LoginRequestAction>(LOGIN_REQUESTED);

export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export type LoginSuccessAction = Action<typeof LOGIN_SUCCEEDED, string>;
export const loginSuccess = creator<LoginSuccessAction>(LOGIN_SUCCEEDED);

export const LOGIN_FAILED = 'LOGIN_FAILED';
export type LoginFailureAction = Action<typeof LOGIN_FAILED, string>;
export const loginFailure = creator<LoginFailureAction>(LOGIN_FAILED);

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export type LogoutRequestAction = Action<typeof LOGOUT_REQUESTED>;
export const logoutRequest = creator<LogoutRequestAction>(LOGOUT_REQUESTED);

export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export type LogoutSuccessAction = Action<typeof LOGOUT_SUCCEEDED, string>;
export const logoutSuccess = creator<LogoutSuccessAction>(LOGOUT_SUCCEEDED);

export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export type LogoutFailureAction = Action<typeof LOGOUT_FAILED, string>;
export const logoutFailure = creator<LogoutFailureAction>(LOGOUT_FAILED);

export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
export type ClearLoginErrorAction = Action<typeof CLEAR_LOGIN_ERROR>;
export const clearLoginError = creator<ClearLoginErrorAction>(CLEAR_LOGIN_ERROR);

export const CREATE_ACCOUNT_REQUESTED = 'CREATE_ACCOUNT_REQUESTED';
export type CreateAccountRequestAction = Action<typeof CREATE_ACCOUNT_REQUESTED, RegistrationData>;
export const createAccountRequest = creator<CreateAccountRequestAction>(CREATE_ACCOUNT_REQUESTED);

export const CREATE_ACCOUNT_SUCCEEDED = 'CREATE_ACCOUNT_SUCCEEDED';
export type CreateAccountSuccessAction = Action<typeof CREATE_ACCOUNT_SUCCEEDED, string>;
export const createAccountSuccess = creator<CreateAccountSuccessAction>(CREATE_ACCOUNT_SUCCEEDED);

export const CREATE_ACCOUNT_FAILED = 'CREATE_ACCOUNT_FAILED';
export type CreateAccountFailureAction = Action<typeof CREATE_ACCOUNT_FAILED, string>;
export const createAccountFailure = creator<CreateAccountFailureAction>(CREATE_ACCOUNT_FAILED);

export const CLEAR_REGISTRATION_ERROR = 'CLEAR_REGISTRATION_ERROR';
export type ClearRegistrationErrorAction = Action<typeof CLEAR_REGISTRATION_ERROR>;
export const clearRegistrationError = creator<ClearRegistrationErrorAction>(
    CLEAR_REGISTRATION_ERROR,
);

export type AuthAction =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutRequestAction
    | LogoutSuccessAction
    | LogoutFailureAction
    | ClearLoginErrorAction
    | CreateAccountRequestAction
    | CreateAccountSuccessAction
    | CreateAccountFailureAction
    | ClearRegistrationErrorAction;
