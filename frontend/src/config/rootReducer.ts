import { combineReducers } from 'redux';

import { authentication } from '@src/features/auth/reducers/authenticationReducer';
import { signUp } from '@src/features/auth/reducers/signUpReducer';

export const rootReducer = combineReducers({
    authentication,
    signUp,
});
