import { combineEpics, ofType, ActionsObservable } from 'redux-observable';
import { mergeMap, pluck } from 'rxjs/operators';

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
                    .then((res: { token: string }) => {
                        localStorage.setItem('jwt', res.token);

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
                    .then((res: any) => {
                        console.log(res);
                        return authAction.createAccountSuccess('Created!!!');
                    })
                    .catch((err: any) => authAction.createAccountFailure(err.message)),
            ),
        );

    return combineEpics(loginEpic, createAccountEpic);
}
