import {Link} from "react-router-dom";
import {cyan, orange, pink, purple} from "@material-ui/core/colors";
import Face from "@material-ui/icons/Face";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventIcon from '@material-ui/icons/Event';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InfoBox from "../../components/dashboard/InfoBox";
import RecentlyProducts from "../../components/dashboard/RecentlyProducts";
import Grid from "@material-ui/core/Grid";
import Data from "../../data";

const DashboardAdmin = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Link to="/table/data" className="button">
                        <InfoBox Icon={DateRangeIcon} color={pink[600]} title="Citas del mees" value="46"/>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <InfoBox Icon={EventAvailableIcon} color={cyan[600]} title="Citas realizadas" value="26"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <InfoBox Icon={EventIcon} color={purple[600]} title="Citas pendientes" value="20"/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <InfoBox Icon={Face} color={orange[600]} title="Nuevos pacientes" value="23"/>
                </Grid>
            </Grid>

            {/*<Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <NewOrders data={Data.dashBoardPage.newOrders}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MonthlySales data={Data.dashBoardPage.monthlySales}/>
                </Grid>
            </Grid>*/}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <RecentlyProducts data={Data.dashBoardPage.nextAppointments}/>
                </Grid>
                {/*<Grid item xs={12} sm={6}>
                    <BrowserUsage data={Data.dashBoardPage.browserUsage}/>
                </Grid>*/}
            </Grid>
        </div>
    );
};

export default DashboardAdmin;
