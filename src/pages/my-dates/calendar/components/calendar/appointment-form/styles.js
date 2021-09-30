const styles = theme => ({
    container: {
        width: theme.spacing(68),
        padding: 0,
        paddingBottom: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(1, 3, 2),
        width: '100%',
        height: '100%'
    },
    header: {
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
    },
    closeButton: {
        float: 'right',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    picker: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0,
        },
        width: '50%',
    },
    timePicker: {
        marginRight: theme.spacing(1),
        '&:last-child': {
            marginRight: 0,
        },
        width: '30%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0),
    },
    icon: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(2),
    },
    textField: {
        width: '100%',
    },
    modal: {
        margin: 'auto',
        overflow: 'hidden',
        width: '85%',
        height: '85%'
    },
});

export default styles;