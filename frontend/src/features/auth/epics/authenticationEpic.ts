import { combineEpics, ofType } from 'redux-observable';
import { map, mergeMap, pluck, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import * as authAction from '../actions/authenticationActions';

export function authenticationEpicFactory(userAuthenticatorService: any) {
    const loginEpic = (action$: any) =>
        action$.pipe(
            ofType(authAction.LOGIN_REQUESTED),
            pluck('payload'),
            mergeMap(credentials =>
                userAuthenticatorService
                    .login(credentials)
                    .then(authAction.loginSuccess)
                    .catch((err: any) => authAction.loginFail(err.message)),
            ),
        );

    return combineEpics(loginEpic);
}
