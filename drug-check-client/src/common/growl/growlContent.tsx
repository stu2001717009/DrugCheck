import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import classNames from 'classnames';

const variantIcon: any = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const snackbar = createMuiTheme({
    overrides: {
        MuiSnackbarContent: {
            root: {
                width: '90%',
                alignItems: 'start'
            },
            action: {
                paddingTop: 5,
                paddingLeft: 0,
                display: 'flow-root'
            },
            message: {
                width: '90%'
            }
        },
        MuiSnackbar: {
            root: {
                alignItems: "start"
            }
        },
        MuiIconButton: {
            root: {
                padding: 0
            }
        }

    }
});


const growlContent = (props: any) => {

    // type: success, warning, error, info
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon: any = variantIcon[variant];

    return (
        <MuiThemeProvider theme={snackbar}>
            <SnackbarContent
                className={classNames(classes[variant || "default"], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        {variant ? <Icon className={classNames(classes.icon, classes.iconVariant)} /> : null}
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        {props.onClose ? <CloseIcon className={classes.icon} /> : null}
                    </IconButton>,
                ]}
                {...other}
            />
        </MuiThemeProvider>
    );
}


const styles1 = (theme: any) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    default: {
        backgroundColor: "rgb(49, 49, 49)",
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
    },
});

export default withStyles(styles1)(growlContent);