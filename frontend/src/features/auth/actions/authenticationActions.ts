export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequest = (payload: any) => ({
    type: LOGIN_REQUESTED,
    payload,
});

export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const loginSuccess = (payload: any) => ({
    type: LOGIN_SUCCEEDED,
    payload,
});

export const LOGIN_FAIL = 'LOGIN_FAIL';
export const loginFail = (payload: any) => ({
    type: LOGIN_FAIL,
    payload,
});
