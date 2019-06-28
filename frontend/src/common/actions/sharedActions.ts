import { Action, creator } from '@src/config/rootAction';

export const APP_INIT = 'APP_INIT';
export type AppInitAction = Action<typeof APP_INIT>;
export const appInit = creator<AppInitAction>(APP_INIT);

export const NO_OPERATION = 'NO_OPERATION';
export type NoOperationAction = Action<typeof NO_OPERATION>;
export const noOperation = creator<NoOperationAction>(NO_OPERATION);

export type SharedActions = AppInitAction | NoOperationAction;
