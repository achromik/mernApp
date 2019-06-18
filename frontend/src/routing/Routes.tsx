import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import { CustomRoute } from 'Common/components/CustomRoute';
import { Spinner } from 'Common/components/Spinner';

const HomePage = lazy(() => import('Components/HomePage/HomePage'));
const Login = lazy(() => import('Components/Login/Login'));

// export const Routes = ({ isAuthenticated }) => (
export const Routes = () => (
    <Suspense fallback={<Spinner />}>
        <Switch>
            <CustomRoute
                exact
                key="/"
                path="/"
                component={HomePage}
                secured={false}
                isAuthenticated={false}
            />
            <CustomRoute
                exact
                key="/login"
                path="/login"
                component={Login}
                secured={false}
                isAuthenticated={false}
            />
        </Switch>
    </Suspense>
);
