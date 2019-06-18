import { combineEpics, ofType } from 'redux-observable';
import { map, mergeMap, pluck, switchMap, take, takeUntil, tap, finalize } from 'rxjs/operators';

import * as authAction from '../actions/authenticationActions';
import { history } from '@src/config/history';

export function authenticationEpicFactory(userAuthenticatorService: any) {
    const loginEpic = (action$: any) =>
        action$.pipe(
            ofType(authAction.LOGIN_REQUESTED),
            pluck('payload'),
            mergeMap(credentials =>
                userAuthenticatorService
                    .login(credentials)
                    .then((res: { token: string }) => {
                        localStorage.setItem('jwt', res.token);

                        return authAction.loginSuccess('Success!');
                    })
                    .catch((err: any) => authAction.loginFail(err.message)),
            ),
        );

    return combineEpics(loginEpic);
}
