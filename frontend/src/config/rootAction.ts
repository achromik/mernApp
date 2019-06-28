import { AuthAction } from '@src/features/auth/actions/authenticationActions';
import { NavigationAction } from '@src/features/navigation/actions/navigationActions';

export interface Action<T, P = null> {
    readonly type: T;
    readonly payload: P;
}

export type AppAction = AuthAction | NavigationAction;

export function creator<A extends Action<T, null>, T extends AppAction['type'] = A['type']>(
    type: T,
    enhancer?: (action: A) => A,
): () => A;

export function creator<
    A extends Action<T, P>,
    T extends AppAction['type'] = A['type'],
    P = A['payload']
>(type: T, enhancer?: (action: A) => A): (payload: P) => A;

export function creator<
    A extends Action<T, P>,
    T extends AppAction['type'] = A['type'],
    P = A['payload']
>(type: T, enhancer: (action: A) => A = a => a): (payload?: P) => A {
    return (payload: P | null = null): A => {
        return enhancer({
            payload,
            type,
        } as A);
    };
}
