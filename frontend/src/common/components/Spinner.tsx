import React from 'react';
import styled from '@emotion/styled';

import { colors } from '@src/config/variables';
import { spin } from '@src/config/keyframes';

const Loader = styled.div`
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    margin: 60px auto;
    position: relative;
    text-indent: -9999em;
    border-top: 0.5rem solid ${colors.spinnerBackgroundColor};
    border-right: 0.5rem solid ${colors.spinnerBackgroundColor};
    border-bottom: 0.5rem solid ${colors.spinnerBackgroundColor};
    border-left: 0.5rem solid ${colors.spinnerColor};
    transform: translateZ(0);
    animation: ${spin} 1.1s infinite linear;

    :after {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        content: ' ';
    }
`;

export const Spinner: React.FC = () => <Loader>Loading</Loader>;
