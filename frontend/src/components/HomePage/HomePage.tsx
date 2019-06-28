import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/styles';
import { Container, Typography, Button } from '@material-ui/core';
import CancelOutlined from '@material-ui/icons/CancelOutlined';

import { sizes } from '@src/config/variables';
import * as auth from '@src/features/auth/selectors/authenticationSelector';
import { AppState } from '@src/config/appState';
import { BackgroundImage } from 'Common/components/BackgroundImage';
import { SignButtons } from 'Components/HomePage/SignButtons';

const PageWrapper = styled(Container)({
    position: 'relative',
    padding: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    overflow: 'hidden',
});

const ButtonsWrapper = styled(Container)({
    marginTop: sizes.marginXL,
    display: 'flex',
    justifyContent: 'space-around',
});

const LogoutIcon = styled(CancelOutlined)({
    marginRight: sizes.marginM,
});

interface HomeState {
    isAuthenticated: boolean;
}

const Home: React.FC<HomeState> = ({ isAuthenticated }: HomeState) => {
    return (
        <PageWrapper maxWidth={false}>
            <BackgroundImage />
            <Typography variant="h2" component="h1">
                <Typography variant="h4" component="span">
                    MERN
                </Typography>
                TRACKER
            </Typography>
            <ButtonsWrapper maxWidth="xs">
                {!isAuthenticated && <SignButtons />}
                {isAuthenticated && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        // component={Link}
                        // to="/logout"
                    >
                        <LogoutIcon />
                        Logout
                    </Button>
                )}
            </ButtonsWrapper>
        </PageWrapper>
    );
};

const mapStateToProps = (state: AppState): { isAuthenticated: boolean } => ({
    isAuthenticated: auth.isAuthenticated(state),
});

const HomePage = connect(mapStateToProps)(Home);

export default HomePage;
