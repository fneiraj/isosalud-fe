import {HelmetProvider} from "react-helmet-async";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {history} from "../helpers";
import {
    AdminCalendarPage,
    DashboardAdmin,
    DashboardPage,
    ForbiddenPage,
    FormPage,
    HomePage,
    InternalErrorPage,
    InventoryPage,
    LoginPage,
    MyDatesPage,
    MyPatientsPage,
    NotFoundPage,
    PatientProfilePage,
    RadiographsPage,
    ScheduleMeetPage,
    TreatmentPlansPage,
    UsersPage
} from "../pages";
import {PrivateRoute} from "./PrivateRoute";
import {Role} from "../models/Role";
import BasicTables from "../pages/Table/BasicTables";
import DataTables from "../pages/Table/DataTables";
import ScrollToTop from "../components/drawer/ScrollToTop";
import EvolutionsPage from "../pages/patient-profile/evolutions";
import MyProfilePage from "../pages/my-profile";

export default (
    <HelmetProvider>
        <ScrollToTop/>
        <Router history={history}>
            <Switch>
                <Route
                    path="/login"
                    component={LoginPage}
                />
                <Route
                    path="/error/403"
                    component={ForbiddenPage}
                />
                <Route
                    path="/error/404"
                    component={NotFoundPage}
                />
                <Route
                    path="/error/500"
                    component={InternalErrorPage}
                />
                <PrivateRoute
                    path="/"
                    component={DashboardPage}
                    exact
                />
                <PrivateRoute
                    path="/home"
                    component={HomePage}
                />
                <PrivateRoute
                    path="/admin"
                    component={DashboardAdmin}
                    roles={[Role.Admin]}
                    exact={true}
                />
                <PrivateRoute
                    path="/admin/calendario"
                    component={AdminCalendarPage}
                    roles={[Role.Admin]}
                />
                <PrivateRoute
                    path="/admin/usuarios"
                    component={UsersPage}
                    roles={[Role.Admin]}
                />
                <PrivateRoute
                    path="/user"
                    component={() => <>Soy user</>}
                    roles={[Role.User]}
                />
                <PrivateRoute
                    path="/mis-citas"
                    component={MyDatesPage}
                    exact
                />
                <PrivateRoute
                    path="/mis-citas/agendar"
                    component={ScheduleMeetPage}
                />
                <PrivateRoute
                    path="/mis-pacientes"
                    component={MyPatientsPage}
                />
                <PrivateRoute
                    path="/inventario"
                    component={InventoryPage}
                />
                <PrivateRoute
                    path="/dashboard"
                    component={DashboardPage}
                />
                <PrivateRoute
                    path="/pacientes/:id"
                    component={PatientProfilePage}
                    exact
                />
                <PrivateRoute
                    path="/pacientes/:id/ficha-clinica/evoluciones"
                    component={EvolutionsPage}
                    exact
                />
                <PrivateRoute
                    path="/pacientes/:id/ficha-clinica/radiografias"
                    component={RadiographsPage}
                    exact
                />
                <PrivateRoute
                    path="/pacientes/:id/planes-tratamiento"
                    component={TreatmentPlansPage}
                    exact
                />
                <PrivateRoute
                    path="/mi-perfil"
                    component={MyProfilePage}
                    exact
                />
                <PrivateRoute
                    path="/form"
                    component={FormPage}
                />
                <PrivateRoute
                    path="/table/basic"
                    component={BasicTables}
                />
                <PrivateRoute
                    path="/table/data"
                    component={DataTables}
                />
                <PrivateRoute
                    path="/test"
                    component={() => <></>}
                />
                <Redirect
                    from="/pacientes/:id/ficha-clinica"
                    to="/pacientes/:id/ficha-clinica/evoluciones"
                    exact
                />
                <Redirect
                    to="/error/404"
                />
            </Switch>
        </Router>
    </HelmetProvider>
);