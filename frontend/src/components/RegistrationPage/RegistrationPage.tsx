import React from 'react';
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

const AvatarStyled = styled(Avatar)({
    background: pink[500],
    marginTop: sizes.marginM,
    marginBottom: sizes.marginM,
});

const GridStyled = styled(Grid)({
    marginTop: sizes.marginM,
    marginBottom: sizes.marginM,
});

const RegistrationPage: React.FC = () => (
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
        <form noValidate>
            <GridStyled container spacing={3} justify="center">
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
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
                        autoComplete="email"
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
                        autoComplete="current-password"
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
    </Container>
);

export default RegistrationPage;
