import { combineEpics, ofType, ActionsObservable } from 'redux-observable';
import { map, pluck, tap } from 'rxjs/operators';

import { REDIRECT_TO_URL, redirectToUrl, RedirectToUrlAction } from '../actions/navigationActions';
import { Epic } from '@src/config/rootEpic';
import { history } from '@src/config/history';
import { noOperation } from 'Common/actions/sharedActions';
import * as auth from '@src/features/auth/actions/authenticationActions';

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
            ofType(auth.CREATE_ACCOUNT_SUCCEEDED),
            map(() => redirectToUrl('/login')),
        );

    return combineEpics(navigationRedirectEpic, redirectToLoginScreenEpic);
}

type RedirectToLoginScreen = auth.CreateAccountSuccessAction;
