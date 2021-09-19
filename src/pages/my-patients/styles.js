const styles = theme => ({
    root: {
        width: "100%",
        //    marginTop: theme.spacing(3)
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
    },
    modal: {
        marginTop: 70,
        marginBottom: 70,
        marginLeft: "auto",
        marginRight: "auto",
        overflow: 'scroll',
        width: '50%',
    },
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
});

export default styles;