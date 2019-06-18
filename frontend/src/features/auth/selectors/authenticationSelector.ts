import { AppState } from '@src/config/appState';

export const isAuthenticated = (state: AppState) => state.authentication.isAuthenticated;
