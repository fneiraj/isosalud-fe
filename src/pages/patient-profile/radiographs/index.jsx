import {Button, Grid, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import RadiographCard from "./components/EvolutionCard";
import {DataMock} from '../../../mock/data';

const styles = {
    root: {
        width: "100%",
        height: "100%"
        //    marginTop: theme.spacing(3)
    },
    tableWrapper: {
        marginLeft: 25,
        marginRight: 25,
        paddingTop: 15,
    },

};

const RadiographsPage = (props) => {
    const {classes} = props;

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Grid container justify="flex-end">
                    <Grid key="addEvolution" item>
                        <Button
                            onClick={() => {
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<AddIcon/>}
                        >
                            Agregar
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-start" spacing={3} style={{marginTop: 10, marginBottom: 10}}>
                    {DataMock.radiographs().map(({id, link, date, author, description}) => (
                        <Grid key={id} item xs={12}>
                            <RadiographCard key={id} id={id} link={link} date={date} author={author}
                                            description={description}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Paper>
    );
};

export default withStyles(styles)(RadiographsPage);
