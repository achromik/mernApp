import { AuthState, SignUpState } from '@src/features/auth/models/auth';

export enum Reducer {
    Authentication = 'authentication',
    SignUp = 'signUp',
}

export interface AppState {
    [Reducer.Authentication]: AuthState;
    [Reducer.SignUp]: SignUpState;
}
