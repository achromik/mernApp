import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';

interface ErrorDialogProps {
    title?: string;
    open: boolean;
    children: React.ReactNode;
    action: Function;
}
export const ErrorDialog: React.FC<ErrorDialogProps> = ({
    title = 'Oops, something went wrong...',
    open,
    children,
    action,
}: ErrorDialogProps) => {
    const handleClick = () => action();

    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClick}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
