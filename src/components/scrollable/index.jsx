import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    scrollable: {
        maxHeight: '270px',
        width: "100%",
        overflow: 'auto'
    }
}));

const Scrollable = ({children, ...rest}) => {
    const classes = useStyles();

    return (
        <div className={classes.scrollable} {...rest}>
            {children}
        </div>
    )
}

export default Scrollable;