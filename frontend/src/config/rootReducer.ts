import { combineReducers } from 'redux';

import { authentication } from '@src/features/auth/reducers/authenticationReducer';

export const rootReducer = combineReducers({
    authentication,
});
