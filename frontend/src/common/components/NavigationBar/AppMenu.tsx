import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { isAuthenticated } from '@src/features/auth/selectors/authenticationSelector';
import { logoutRequest } from '@src/features/auth/actions/authenticationActions';
import { AppState } from '@src/config/appState';

interface StateProps {
    isAuthenticated: boolean;
}

interface AppMenu extends StateProps {
    logoutRequest: typeof logoutRequest;
}

const AppMenuRaw: React.FC<AppMenu> = ({ isAuthenticated, logoutRequest }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logoutRequest();
        handleMenuClose();
    };

    return (
        <div>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {!isAuthenticated && (
                    <>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                            Log in
                        </MenuItem>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    isAuthenticated: isAuthenticated(state),
});

export const AppMenu = connect(
    mapStateToProps,
    { logoutRequest },
)(AppMenuRaw);
