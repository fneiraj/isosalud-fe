const styles = () => ({

    mainbox: {
        backgroundColor: "#95c2de",
        height: "100%",
        width: "100%",
        position: "absolute",
    },

    mainbox2: {
        backgroundColor: "#95c2de",
        margin: "auto",
        marginTop: "5%",
        height: "600px",
        width: "600px",
        position: "relative",
    },

    err: {
        color: "#ffffff",
        fontSize: "11rem",
        position: "absolute",
        left: "20%",
        top: "8%",
    },

    err2: {
        color: "#ffffff",
        //font-family: 'Nunito Sans', sans-serif,
        fontSize: "11rem",
        position: "absolute",
        left: "40%",
        top: "12%",
    },

    err3: {
        color: "#ffffff",
        //font-family: 'Nunito Sans', sans-serif,
        fontSize: "11rem",
        position: "absolute",
        left: "60%",
        top: "16%",
    },

    msg: {
        textAlign: "center",
        //color: "#ffffff",
        //font-family: 'Nunito Sans', sans-serif,
        fontSize: "1.6rem",
        position: "absolute",
        left: "16%",
        top: "45%",
        width: "75%",
    },

    a: {
        textDecoration: "none",
        color: "white",
        "&:hover": {
            textDecoration: "underline",
        }
    },
})

export default styles;