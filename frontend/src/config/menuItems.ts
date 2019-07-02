export interface MenuItem {
    text: string;
    to: string;
    authenticated: boolean;
    type?: string;
}

export const menuItems: MenuItem[] = [
    {
        text: 'Profile',
        to: '/profile',
        authenticated: true,
    },
    {
        text: 'Log out',
        to: '/logout',
        authenticated: true,
        type: 'logout',
    },
    {
        text: 'Log in',
        to: '/login',
        authenticated: false,
    },
];
