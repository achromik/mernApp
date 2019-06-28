import * as React from 'react';
import { styled } from '@material-ui/styles';
import { Container } from '@material-ui/core';

const BlurredImage = styled(Container)({
    position: 'absolute',
    margin: '',
    padding: 0,
    height: '110vh',
    width: '110vw',
    background: '#00c6ff',
    filter: 'blur(2px)',
    backgroundImage:
        'linear-gradient(90deg, #d53369a3 0%, #daae5145 100%), url("../../assets/images/hero.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
});

export const BackgroundImage: React.FC = () => <BlurredImage maxWidth={false} />;
