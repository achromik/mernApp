import { combineEpics, ofType, ActionsObservable } from 'redux-observable';
import { mergeMap, pluck, switchMap } from 'rxjs/operators';

import * as authAction from '../actions/authenticationActions';
import { Credentials } from '../models/auth';

export function authenticationEpicFactory(userAuthenticatorService: any) {
    const loginEpic = (action$: ActionsObservable<authAction.LoginRequestAction>) =>
        action$.pipe(
            ofType(authAction.LOGIN_REQUESTED),
            pluck('payload'),
            mergeMap((credentials: Credentials) =>
                userAuthenticatorService
                    .login(credentials)
                    .then((res: { token: string; refreshToken: string }) => {
                        localStorage.setItem('jwt', res.token);
                        localStorage.setItem('refreshToken', res.refreshToken);

                        return authAction.loginSuccess('Success!');
                    })
                    .catch((err: any) => authAction.loginFailure(err.message)),
            ),
        );

    const createAccountEpic = (action$: ActionsObservable<authAction.CreateAccountRequestAction>) =>
        action$.pipe(
            ofType(authAction.CREATE_ACCOUNT_REQUESTED),
            pluck('payload'),
            mergeMap((credentials: Credentials) =>
                userAuthenticatorService
                    .createAccount(credentials)
                    .then(() => authAction.createAccountSuccess('Created!!!'))
                    .catch((err: any) => authAction.createAccountFailure(err.message)),
            ),
        );

    const logoutEpic = (action$: ActionsObservable<authAction.LogoutRequestAction>) =>
        action$.pipe(
            ofType(authAction.LOGOUT_REQUESTED),
            pluck('payload'),
            switchMap(async () => {
                const refreshToken = await localStorage.getItem('refreshToken');
                return userAuthenticatorService
                    .logout(refreshToken)
                    .then((res: { message: string }) => authAction.logoutSuccess(res.message))
                    .catch((err: any) => authAction.logoutFailure(err));
            }),
        );

    return combineEpics(loginEpic, createAccountEpic, logoutEpic);
}
