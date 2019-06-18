import { AuthState } from '@src/features/auth/models/auth';

export enum Reducer {
    Authentication = 'authentication',
}

export interface AppState {
    [Reducer.Authentication]: AuthState;
}
