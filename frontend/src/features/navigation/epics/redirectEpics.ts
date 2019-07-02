import { combineEpics, ofType, ActionsObservable } from 'redux-observable';
import { map, pluck, tap } from 'rxjs/operators';

import { REDIRECT_TO_URL, redirectToUrl, RedirectToUrlAction } from '../actions/navigationActions';
import { Epic } from '@src/config/rootEpic';
import { history } from '@src/config/history';
import { noOperation } from 'Common/actions/sharedActions';
import {
    CREATE_ACCOUNT_SUCCEEDED,
    LOGOUT_SUCCEEDED,
    LOGIN_SUCCEEDED,
    CreateAccountSuccessAction,
    LogoutSuccessAction,
    LoginSuccessAction,
} from '@src/features/auth/actions/authenticationActions';

export function navigationRedirectEpicFactory(): Epic {
    const navigationRedirectEpic = (action$: ActionsObservable<RedirectToUrlAction>) =>
        action$.pipe(
            ofType(REDIRECT_TO_URL),
            pluck('payload'),
            tap(destination => history.push(destination)),
            map(noOperation),
        );

    const redirectToLoginScreenEpic = (action$: ActionsObservable<RedirectToLoginScreen>) =>
        action$.pipe(
            ofType(CREATE_ACCOUNT_SUCCEEDED, LOGOUT_SUCCEEDED),
            map(() => redirectToUrl('/login')),
        );

    const redirectToDashboardEpic = (action$: ActionsObservable<LoginSuccessAction>) =>
        action$.pipe(
            ofType(LOGIN_SUCCEEDED),
            map(() => redirectToUrl('/dashboard')),
        );

    return combineEpics(navigationRedirectEpic, redirectToLoginScreenEpic, redirectToDashboardEpic);
}

type RedirectToLoginScreen = CreateAccountSuccessAction | LogoutSuccessAction;
