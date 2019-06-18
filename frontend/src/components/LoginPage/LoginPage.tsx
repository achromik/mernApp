import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { AppState } from '@src/config/appState';
import * as auth from '@src/features/auth/selectors/authenticationSelector';

interface StateProps {
    isAuthenticated: boolean;
}

const Login: React.FC<StateProps> = ({ isAuthenticated }: StateProps) => (
    <>
        {isAuthenticated && <Redirect to="/profile" />}
        <div>Login</div>
    </>
);

const mapStateToProps = (state: AppState): StateProps => ({
    isAuthenticated: auth.isAuthenticated(state),
});

const LoginPage = connect(mapStateToProps)(Login);

export default LoginPage;
