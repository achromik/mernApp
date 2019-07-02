import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '@src/config/appState';
import * as auth from '@src/features/auth/selectors/authenticationSelector';

interface StateProps {
    isAuthenticated: boolean;
}

const Profile: React.FC<StateProps> = ({ isAuthenticated }) => {
    return (
        <div>
            <h1>Profile Page</h1>
            {isAuthenticated && <h4>You are login</h4>}
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    isAuthenticated: auth.isAuthenticated(state),
});

const ProfilePage = connect(mapStateToProps)(Profile);

export default ProfilePage;
