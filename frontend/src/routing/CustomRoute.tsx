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
    redirectTo = '',
    path,
    ...rest
}) => {
    if (!redirectTo) {
        redirectTo = secured ? '/login' : '/ ';
    }

    return (
        <Route
            path={path}
            {...rest}
            render={props =>
                isAuthenticated === secured || !secured ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectTo} />
                )
            }
        />
    );
};
