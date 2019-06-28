import { AppState } from '@src/config/appState';

export const loadState = (): AppState | any => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            throw new Error('No localStorage');
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log(err);
    }
};

export const saveState = (state: AppState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
};
