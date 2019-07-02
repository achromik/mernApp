import { Action, creator } from '@src/config/rootAction';

export const REDIRECT_TO_URL = 'REDIRECT_TO_URL';
export type RedirectToUrlAction = Action<typeof REDIRECT_TO_URL, string>;
export const redirectToUrl = creator<RedirectToUrlAction>(REDIRECT_TO_URL);

export type NavigationAction = RedirectToUrlAction;
