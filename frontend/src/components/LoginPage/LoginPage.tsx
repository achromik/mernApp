import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';
import pink from '@material-ui/core/colors/pink';

import { sizes } from '@src/config/variables';
import { AppState } from '@src/config/appState';
import * as auth from '@src/features/auth/selectors/authenticationSelector';
import { loginRequest } from '@src/features/auth/actions/authenticationActions';
import { Credentials } from '@src/features/auth/models/auth';

const AvatarStyled = styled(Avatar)({
    background: pink[500],
    marginTop: sizes.marginM,
    marginBottom: sizes.marginM,
});

const GridStyled = styled(Grid)({
    marginTop: sizes.marginM,
    marginBottom: sizes.marginM,
});

interface StateProps {
    isAuthenticated: boolean;
    loginRequest: (credentials: Credentials) => void;
}

const Login: React.FC<StateProps> = ({ isAuthenticated, loginRequest }: StateProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            {isAuthenticated && <Redirect to="/profile" />}
            <Container component="main" maxWidth="sm">
                <GridStyled container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <AvatarStyled>
                            <LockOutlinedIcon />
                        </AvatarStyled>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Sing in
                        </Typography>
                    </Grid>
                </GridStyled>
                <form
                    noValidate
                    onSubmit={e => {
                        e.preventDefault();
                        console.log(email, password);
                        loginRequest({ email, password });
                    }}
                >
                    <GridStyled container spacing={3} justify="center">
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={email}
                                label="Email Address"
                                type="email"
                                autoComplete="email"
                                variant="outlined"
                                fullWidth
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={password}
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                fullWidth
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth color="primary" type="submit">
                                Sign in
                            </Button>
                        </Grid>
                    </GridStyled>
                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to="/registration">Don't have an account? Sign Up</Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

const mapStateToProps = (state: AppState): { isAuthenticated: boolean } => ({
    isAuthenticated: auth.isAuthenticated(state),
});

const LoginPage = connect(
    mapStateToProps,
    { loginRequest },
)(Login);

export default LoginPage;
