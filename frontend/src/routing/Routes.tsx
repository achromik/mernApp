import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import { CustomRoute } from '@src/routing/CustomRoute';
import { Spinner } from 'Common/components/Spinner';

const HomePage = lazy(() => import('Components/HomePage/HomePage'));
const LoginPage = lazy(() => import('Components/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('Components/ProfilePage/ProfilePage'));

export const Routes = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
    <Suspense fallback={<Spinner />}>
        <Switch>
            <CustomRoute
                exact
                key="/"
                path="/"
                component={HomePage}
                isAuthenticated={isAuthenticated}
            />
            <CustomRoute
                exact
                key="/login"
                path="/login"
                component={LoginPage}
                isAuthenticated={isAuthenticated}
            />
            <CustomRoute
                exact
                key="/profile"
                path="/profile"
                component={ProfilePage}
                secured={true}
                isAuthenticated={isAuthenticated}
                redirectTo="/login"
            />
        </Switch>
    </Suspense>
);
