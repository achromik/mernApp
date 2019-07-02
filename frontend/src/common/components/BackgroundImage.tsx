import styled from '@emotion/styled';

export const BackgroundImage = styled.div`
    position: absolute;
    height: 100%;
    width: 100vw;
    background: #00c6ff;
    filter: blur(2px);
    background-image: linear-gradient(90deg, #d53369a3 0%, #daae5145 100%),
        url('../../assets/images/hero.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
`;
