import React from 'react';
import styled from '@emotion/styled';

import { colors } from '@src/config/variables';
import { spin } from '@src/config/keyframes';

const Loader = styled.div`
    position: relative;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    text-indent: -9999em;
    border-top: 0.5rem solid ${colors.spinnerBackgroundColor};
    border-right: 0.5rem solid ${colors.spinnerBackgroundColor};
    border-bottom: 0.5rem solid ${colors.spinnerBackgroundColor};
    border-left: 0.5rem solid ${colors.spinnerColor};
    transform: translateZ(0);
    animation: ${spin} 1.1s infinite linear;

    :after {
        content: ' ';
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

export const Spinner: React.FC = () => (
    <Wrapper>
        <Loader>Loading</Loader>
    </Wrapper>
);
