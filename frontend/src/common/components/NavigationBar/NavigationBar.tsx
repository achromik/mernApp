import * as React from 'react';
import * as Router from 'react-router';
import { Link } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

import { ElevationScroll } from './ElevationScroll';
import { history } from '@src/config/history';
import { routesNames, Route } from '@src/routing/routesNames';
import { AppMenu } from './AppMenu';

const getPageName = (): string => {
    return routesNames[history.location.pathname as Route];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
    }),
);

interface StateProps {
    isAuthenticated: boolean;
}

export const Navigation: React.FC<Router.RouteComponentProps & StateProps> = ({
    isAuthenticated,
}) => {
    const classes = useStyles();

    return (
        <>
            <ElevationScroll>
                <AppBar>
                    <Toolbar>
                        {isAuthenticated && (
                            <>
                                <IconButton edge="start" color="inherit">
                                    <MenuIcon />
                                </IconButton>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    component={Link}
                                    to="/dashboard"
                                >
                                    <HomeIcon />
                                </IconButton>
                            </>
                        )}
                        <Typography className={classes.title} variant="h6">
                            {isAuthenticated && getPageName()}
                        </Typography>
                        <AppMenu />
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </>
    );
};

export const NavigationBar = withWidth()(Router.withRouter(Navigation));
