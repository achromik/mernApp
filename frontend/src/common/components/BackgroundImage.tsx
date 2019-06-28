import * as React from 'react';
import styled from '@emotion/styled';

const BlurredImage = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: #00c6ff;
    filter: blur(2px);
    background-image: linear-gradient(90deg, #d53369a3 0%, #daae5145 100%),
        url('../../assets/images/hero.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
`;

export const BackgroundImage: React.FC = () => <BlurredImage />;
