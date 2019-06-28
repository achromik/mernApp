import { keyframes } from '@emotion/core';

export const spin = keyframes`
0%{
    transform: rotate(0deg);
}
60% {
    transform: rotate(130deg);

}
80% {
    transform: rotate(230deg)
}
100% {
    transform: rotate(360deg);
}
`;
