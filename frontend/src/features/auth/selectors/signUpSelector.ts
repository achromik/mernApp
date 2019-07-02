import { AppState } from '@src/config/appState';

export const succeeded = (state: AppState) => state.signUp.succeeded;

export const failed = (state: AppState) => state.signUp.failed;

export const message = (state: AppState) => state.signUp.message;
