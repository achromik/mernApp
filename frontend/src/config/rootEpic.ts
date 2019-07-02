import { combineEpics, Epic as _Epic } from 'redux-observable';

import { AppAction } from './rootAction';

import * as service from './rootService';
import { authenticationEpicFactory } from '@src/features/auth/epics/authenticationEpic';
import { navigationRedirectEpicFactory } from '@src/features/navigation/epics/redirectEpics';

export const rootEpic = combineEpics(
    authenticationEpicFactory(service.userAuthenticator),
    navigationRedirectEpicFactory(),
);

export type Epic = _Epic<AppAction>;
