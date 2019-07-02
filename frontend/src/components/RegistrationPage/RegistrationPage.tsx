import React from 'react';
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

import { useInput } from 'Common/hooks/inputHook';
import { sizes } from '@src/config/variables';
import { AppState } from '@src/config/appState';
import * as auth from '@src/features/auth/selectors/authenticationSelector';
import * as registration from '@src/features/auth/selectors/signUpSelector';
import {
    createAccountRequest,
    clearRegistrationError,
} from '@src/features/auth/actions/authenticationActions';
import { RegistrationData } from '@src/features/auth/models/auth';
import { ErrorDialog } from '../../common/components/ErrorDialog';

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
    isRegistrationFailed: boolean;
    registrationMessage: string;
}

interface RegistrationProps extends StateProps {
    createAccountRequest: (registrationData: RegistrationData) => void;
    clearRegistrationError: typeof clearRegistrationError;
}

const Registration: React.FC<RegistrationProps> = ({
    isAuthenticated,
    isRegistrationFailed,
    registrationMessage,
    createAccountRequest,
    clearRegistrationError,
}) => {
    const { value: email, onChange: onEmailChange } = useInput('');
    const { value: password, onChange: onPasswordChange } = useInput('');
    const { value: firstName, onChange: onFirstNameChange } = useInput('');
    const { value: lastName, onChange: onLastNameChange } = useInput('');

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        createAccountRequest({ email, password, firstName, lastName });
    };

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
                            Sing up
                        </Typography>
                    </Grid>
                </GridStyled>
                <form noValidate onSubmit={handleSubmit}>
                    <GridStyled container spacing={3} justify="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                autoFocus
                                onChange={onFirstNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                onChange={onLastNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={onEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Sign Up
                            </Button>
                        </Grid>
                    </GridStyled>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
                <ErrorDialog open={isRegistrationFailed} action={clearRegistrationError}>
                    {registrationMessage}
                </ErrorDialog>
            </Container>
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    isAuthenticated: auth.isAuthenticated(state),
    isRegistrationFailed: registration.failed(state),
    registrationMessage: registration.message(state),
});

const RegistrationPage = connect(
    mapStateToProps,
    { createAccountRequest, clearRegistrationError },
)(Registration);

export default RegistrationPage;
