import { combineEpics, Epic as _Epic } from 'redux-observable';

import * as service from './rootService';
import { authenticationEpicFactory } from '@src/features/auth/epics/authenticationEpic';

export const rootEpic = combineEpics<any>(authenticationEpicFactory(service.userAuthenticator));

export type Epic = _Epic<any, any>;
