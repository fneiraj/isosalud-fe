import defaultTheme from "../theme";

const styles = () => ({
    container: {
        margin: "80px 20px 20px 15px",
        paddingLeft: defaultTheme.drawer.width,
        [defaultTheme.breakpoints.down("sm")]: {
            paddingLeft: 0
        },
        position: "absolute",
//      width: `calc(100% - ${defaultTheme.drawer.width})`//px
    },
    containerFull: {
        paddingLeft: defaultTheme.drawer.miniWidth,
        [defaultTheme.breakpoints.down("sm")]: {
            paddingLeft: 0
        }
    }
});

export default styles;