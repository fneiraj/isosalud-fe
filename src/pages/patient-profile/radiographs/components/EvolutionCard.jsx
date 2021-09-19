import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';

const RadiographCard = ({id, date, author, description}) => {

    return (
        <Card className="" variant="outlined">
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom>
                            #{id}
                        </Typography>
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom>
                            {date}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Typography color="textSecondary" style={{whiteSpace: 'pre-line'}} gutterBottom>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid key="downloadButton" item>
                            <Button
                                onClick={() => {
                                }}
                                variant="contained"
                                color="primary"
                                //              className={classes.button}
                                endIcon={<GetAppIcon/>}
                            >
                                Descargar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs/>
                    <Grid item>
                        <Typography color="textSecondary">
                            Dr/a: {author}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default RadiographCard;