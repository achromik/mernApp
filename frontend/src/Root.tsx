import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouterProps } from 'react-router-dom';
import styled from '@emotion/styled';

import { Header } from 'Components/Header';
import { Spinner } from 'Common/components/Spinner';
import { Routes } from '@src/routing/Routes';
// import { history } from '@src/routing/history';
import { RouterProps } from 'react-router';

export const Root: React.FC<BrowserRouterProps> = () => {
    return (
        <Router>
            <Switch>
                <Routes />
            </Switch>
        </Router>
    );
};
