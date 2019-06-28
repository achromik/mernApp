export interface AuthState {
    failed: boolean;
    isAuthenticated: boolean;
    isFetching: boolean;
    message: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface JWTTokenData {
    token: string;
}

export interface SignUpState {
    message: string;
    failed: boolean;
    isFetching: boolean;
    succeeded: boolean;
}
