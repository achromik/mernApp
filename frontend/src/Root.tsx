import * as React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, BrowserRouterProps } from 'react-router-dom';

import { Routes } from '@src/routing/Routes';
import { AppState } from '@src/config/appState';
import { history } from '@src/config/history';
import * as auth from '@src/features/auth/selectors/authenticationSelector';

interface StateProps extends BrowserRouterProps {
    isAuthenticated: boolean;
}

const RootContainer: React.FC<StateProps> = (props: StateProps) => (
    <Router history={history}>
        <Switch>
            <Routes {...props} />
        </Switch>
    </Router>
);

const mapStateToProps = (state: AppState): StateProps => ({
    isAuthenticated: auth.isAuthenticated(state),
});

export const Root = connect(mapStateToProps)(RootContainer);
