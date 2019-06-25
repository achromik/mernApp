import { Action, creator } from '@src/config/rootAction';

import { Credentials } from '../models/auth';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export type LoginRequestAction = Action<typeof LOGIN_REQUESTED, Credentials>;
export const loginRequest = creator<LoginRequestAction>(LOGIN_REQUESTED);

export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export type LoginSuccessAction = Action<typeof LOGIN_SUCCEEDED, string>;
export const loginSuccess = creator<LoginSuccessAction>(LOGIN_SUCCEEDED);

export const LOGIN_FAILED = 'LOGIN_FAILED';
export type LoginFailureAction = Action<typeof LOGIN_FAILED, string>;
export const loginFailure = creator<LoginFailureAction>(LOGIN_FAILED);

export const CREATE_ACCOUNT_REQUESTED = 'CREATE_ACCOUNT_REQUESTED';
export type CreateAccountRequestAction = Action<typeof CREATE_ACCOUNT_REQUESTED, Credentials>;
export const createAccountRequest = creator<CreateAccountRequestAction>(CREATE_ACCOUNT_REQUESTED);

export const CREATE_ACCOUNT_SUCCEEDED = 'CREATE_ACCOUNT_SUCCEEDED';
export type CreateAccountSuccessAction = Action<typeof CREATE_ACCOUNT_SUCCEEDED, string>;
export const createAccountSuccess = creator<CreateAccountSuccessAction>(CREATE_ACCOUNT_SUCCEEDED);

export const CREATE_ACCOUNT_FAILED = 'CREATE_ACCOUNT_FAILED';
export type CreateAccountFailureAction = Action<typeof CREATE_ACCOUNT_FAILED, string>;
export const createAccountFailure = creator<CreateAccountFailureAction>(CREATE_ACCOUNT_FAILED);

export type AuthAction =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | CreateAccountRequestAction
    | CreateAccountSuccessAction
    | CreateAccountFailureAction;
