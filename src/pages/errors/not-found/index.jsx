import {Grid, Typography, withStyles} from "@material-ui/core";
import {Helmet} from "react-helmet-async";
import classNames from 'classnames';
import styles from './styles';
import Animation from "../../../components/animation/animation";
import {Link} from "react-router-dom";


const NotFound = () => {

    return (
        <>
            <Helmet>
                <title>Error 404 - No encontrado | ISOSALUD</title>
            </Helmet>
            <Grid
                container
                alignItems="center"
                justify="center"
                style={{ alignItems: 'center', width: '100%', height: '100%', backgroundColor: "#95c2de"}}>
                <Grid item>
                    <>
                        <Animation
                        autoplay={true}
                        loop={true}
                        animationName={"404-not-found"}
                    />
                    <Typography>
                        La página que buscas no fue entrada.<p>Ve al <Link to="/">inicio</Link> y intenta buscar desde ahí.</p></Typography>
                        </>
                </Grid>
            </Grid>
        </>
    );
}

export default withStyles(styles)(NotFound);