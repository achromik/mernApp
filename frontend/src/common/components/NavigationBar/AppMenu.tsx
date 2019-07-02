import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuPosition from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { isAuthenticated } from '@src/features/auth/selectors/authenticationSelector';
import { logoutRequest } from '@src/features/auth/actions/authenticationActions';
import { AppState } from '@src/config/appState';
import { menuItems, MenuItem } from '@src/config/menuItems';

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

    const renderMenuItem = (item: MenuItem) =>
        !item.type ? (
            <MenuPosition key={item.to} onClick={handleMenuClose} component={Link} to={item.to}>
                {item.text}
            </MenuPosition>
        ) : (
            <MenuPosition key={item.to} onClick={handleLogout} component="div">
                {item.text}
            </MenuPosition>
        );

    const renderMenuItems = (menuItems: MenuItem[]) => {
        const shouldRenderMenuItem = ({ authenticated }: MenuItem): boolean =>
            isAuthenticated ? authenticated : !authenticated;
        const menuItemsToRender = menuItems.filter(shouldRenderMenuItem);
        return menuItemsToRender.map(renderMenuItem);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {renderMenuItems(menuItems)}
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
