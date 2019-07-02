import * as React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

interface Props {
    children: React.ReactElement;
}

export const ElevationScroll: React.FC<Props> = props => {
    const { children } = props;

    const trigger = useScrollTrigger({
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};
