import { AppState } from '@src/config/appState';

export const isAuthenticated = (state: AppState) => state.authentication.isAuthenticated;

export const failed = (state: AppState) => state.authentication.failed;

export const message = (state: AppState) => state.authentication.message;
