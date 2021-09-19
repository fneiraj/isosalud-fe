import {
    Avatar,
    Button,
    Card,
    CardContent,
    Grid,
    Link as MuiLink,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, {useState} from "react";
import styles from "../styles";
import {Link} from "react-router-dom";
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
    ukTimeline: {
        maxHeight: "300px"
    },
    ukTimelineItem: {
        maxHeight: "300px"
    },
    ukCard: {
        maxHeight: "300px"
    },
    uk_timeline__uk_timeline_item: {
        display: "flex",
            position: "relative"
    },
    uk_timeline__uk_timeline_item__before: {
        background: "#dadee4",
            content: "\"\"",
            height: "100%",
            left: "19px",
            position: "absolute",
            top: "20px",
            width: "2px",
            zIndex: "-1"
    },
    uk_timeline__uk_timeline_item__uk_timeline_icon__uk_badge: {
        marginTop: "20px",
            width: "40px",
            height: "40px"
    },
    uk_timeline__uk_timeline_item__uk_timeline_content: {
        MsFlex: "1 1 auto",
            flex: "1 1 auto",
            padding: "0 0 0 1rem"
    }
}));


const PatientAppointments = ({handleAddNote}) => {
    const classes = useStyles();

    const [tabSelected, setTabSelected] = useState(0);

    const handleTabChange = (event, newValue) => setTabSelected(newValue);

    const AntTabs = withStyles({
        root: {
            borderBottom: '1px solid #e8e8e8',
        },
        indicator: {
            backgroundColor: '#1890ff',
        },
    })(Tabs);

    const AntTab = withStyles((theme) => ({
        root: {
            textTransform: 'none',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing(4),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#40a9ff',
                opacity: 1,
            },
            '&$selected': {
                color: '#1890ff',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#40a9ff',
            },
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    const selector = () => (
        <>
            <AntTabs value={tabSelected} onChange={handleTabChange}>
                <AntTab label="Próximas citas"/>
                <AntTab label="Pasadas citas"/>
                <Button
                    color="primary"
                    className={classes.right}
                    endIcon={<EventIcon/>}
                >
                    Agregar cita
                </Button>
            </AntTabs>
        </>
    )

    const timeLine = () => (
        <div className="uk-container uk-padding">
            <div className={"uk-timeline"}>
                <div className="uk-timeline-item">
                    <div className="uk-timeline-icon">
                        <span className="uk-badge"><span uk-icon="check"></span></span>
                    </div>
                    <div className="uk-timeline-content">
                        <div className="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                            <div className="uk-card-header">
                                <div className="uk-grid-small uk-flex-middle" uk-grid>
                                    <h3 className="uk-card-title">
                                        <time dateTime="2020-07-08">July 8</time>
                                    </h3>
                                    <span className="uk-label uk-label-success uk-margin-auto-left">Feature</span>
                                </div>
                            </div>
                            <div className="uk-card-body">
                                <p className="uk-text-success">Fully responsive timeline you can add to your UIkit 3
                                    project
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="uk-timeline-item">
                    <div className="uk-timeline-icon">
                        <span className="uk-badge"><span uk-icon="check"></span></span>
                    </div>
                    <div className="uk-timeline-content">
                        <div className="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                            <div className="uk-card-header">
                                <div className="uk-grid-small uk-flex-middle" uk-grid>
                                    <h3 className="uk-card-title">
                                        <time dateTime="2020-07-07">July 7</time>
                                    </h3>
                                    <span className="uk-label uk-label-warning uk-margin-auto-left">Test</span>
                                </div>
                            </div>
                            <div className="uk-card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.
                                </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.
                                </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="uk-timeline-item">
                    <div className="uk-timeline-icon">
                        <span className="uk-badge"><span uk-icon="check"></span></span>
                    </div>
                    <div className="uk-timeline-content">
                        <div className="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                            <div className="uk-card-header">
                                <div className="uk-grid-small uk-flex-middle" uk-grid>
                                    <h3 className="uk-card-title">
                                        <time dateTime="2020-07-06">July 6</time>
                                    </h3>
                                    <span className="uk-label uk-label-danger uk-margin-auto-left">Fix</span>
                                </div>
                            </div>
                            <div className="uk-card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt.
                                </p>
                            </div>
                        </div>
                        <a href="#"><span className="uk-margin-small-right" uk-icon="triangle-down"></span>Load more</a>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Card variant={"outlined"}>
            <CardContent>
                {selector()}
                {timeLine()}
            </CardContent>
        </Card>
    )
}

export default PatientAppointments;