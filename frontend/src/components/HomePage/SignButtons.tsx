import * as React from 'react';
import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import InputOutlined from '@material-ui/icons/InputOutlined';
import HowToReg from '@material-ui/icons/HowToRegOutlined';

import { sizes } from '@src/config/variables';

const SignInIcon = styled(InputOutlined)({
    marginRight: sizes.marginM,
});

const SignUpIcon = styled(HowToReg)({
    marginRight: sizes.marginM,
});
export const SignButtons: React.FC = () => (
    <>
        <Button variant="contained" color="primary" size="large" component={Link} to="/login">
            <SignInIcon />
            Sign in
        </Button>
        <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/registration"
        >
            <SignUpIcon />
            Sign up
        </Button>
    </>
);
