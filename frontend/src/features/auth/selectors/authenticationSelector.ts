import { AppState } from '@src/config/appState';

export const isAuthenticated = (state: AppState) => state.authentication.isAuthenticated;

export const isFailed = (state: AppState) => state.authentication.failed;
