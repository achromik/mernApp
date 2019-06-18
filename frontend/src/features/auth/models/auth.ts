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
