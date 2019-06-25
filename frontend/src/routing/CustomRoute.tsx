import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface CustomRouteProps {
    component: React.ReactType;
    secured?: boolean;
    isAuthenticated: boolean;
    redirectTo?: string;
    path?: string;
    exact?: boolean;
    rest?: any;
}

export const CustomRoute: React.FC<CustomRouteProps> = ({
    component: Component,
    secured = false,
    isAuthenticated,
    redirectTo = secured ? '/login' : '/ ',
    path,
    ...rest
}) => (
    <Route
        path={path}
        {...rest}
        render={props =>
            isAuthenticated || !secured ? <Component {...props} /> : <Redirect to={redirectTo} />
        }
    />
);
