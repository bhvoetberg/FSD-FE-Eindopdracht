import React, {useContext, useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import '../src/App.css';

import {AuthContext} from './context/AuthContext';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import PlanningPage from './pages/planningPage/PlanningPage';
import RealisationPage from './pages/realisationPage/RealisationPage';

import EmployeePage from './pages/employeePage/EmployeePage';
import EmployeeNewPage from "./pages/employeePage/employeeNewPage/EmployeeNewPage";
import EmployeeUpdatePage from "./pages/employeePage/employeeUpdatePage/EmployeeUpdatePage";

import ClientPage from './pages/clientPage/ClientPage';
import ClientNewPage from './pages/clientPage/clientNewPage/ClientNewPage';
import ClientUpdatePage from './pages/clientPage/clientUpdatePage/ClientUpdatePage';

import MedicinePage from './pages/medicinePage/MedicinePage';
import MedicineNewPage from "./pages/medicinePage/medicineNewPage/medicineNewPage";
import MedicineUpdatePage from "./pages/medicinePage/medicineUpdatePage/MedicineUpdatePage";

import MedicationPage from './pages/medicationPage/MedicationPage';
import MedicationNewPage from "./pages/medicationPage/medicationNewPage/MedicationNewPage";
import MedicationUpdatePage from "./pages/medicationPage/medicationUpdatePage/MedicationUpdatePage";

import UserPage from './pages/userPage/UserPage';
import UserNewPage from "./pages/userPage/userNewPage/UserNewPage";
import UserUpdatePage from './pages/userPage/userUpdatePage/UserUpdatePage'
import UserAuthorityPage from './pages/userPage/userAuthorityPage/UserAuthorityPage'


import Navigation from "./components/navigation/Navigation";
import MedicationUpdateDetailsPage
    from "./pages/medicationPage/medicationUpdateDetailsPage/MedicationUpdateDetailsPage";

function App() {
    const {isAuth, user} = useContext(AuthContext);
    const [hasUserRole, setHasUserRole] = useState(false);
    const [hasAdminRole, setHasAdminRole] = useState(false);
    const [hasSupervisorRole, setHasSupervisorRole] = useState(false);

    useEffect(() => {
        if (isAuth) {
            setHasUserRole(user.authorities.some(item =>
                item.authority === "ROLE_USER"));
            setHasAdminRole(user.authorities.some(item =>
                item.authority === "ROLE_ADMIN"));
            setHasSupervisorRole(user.authorities.some(item =>
                item.authority === "ROLE_SUPERVISOR"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    return (
        <>
            <header>
                <Navigation/>
            </header>
            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>

                {isAuth ?
                    <>
                        <Route exact path="/planning">
                            {hasUserRole ? <PlanningPage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/realisation/:id">
                            {hasUserRole ? <RealisationPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/employee">
                            {hasSupervisorRole ? <EmployeePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/employee-update/:id">
                            {hasSupervisorRole ? <EmployeeUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/employee-new">
                            {hasSupervisorRole ? <EmployeeNewPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/client">
                            {hasSupervisorRole ? <ClientPage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/client-update/:id">
                            {hasSupervisorRole ? <ClientUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/client-new">
                            {hasSupervisorRole ? <ClientNewPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/medicine">
                            {hasSupervisorRole ? <MedicinePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/medicine-update/:id">
                            {hasSupervisorRole ? <MedicineUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/medicine-new">
                            {hasSupervisorRole ? <MedicineNewPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/medication">
                            {(hasUserRole || hasSupervisorRole) ? <MedicationPage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/medication-update/:id">
                            {(hasUserRole || hasSupervisorRole) ? <MedicationUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/medication-update/medication-update-details/:id">
                            {(hasUserRole || hasSupervisorRole) ? <MedicationUpdateDetailsPage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/medication/medication-new">
                            {(hasUserRole || hasSupervisorRole) ? <MedicationNewPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/user">
                            {hasAdminRole ? <UserPage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/user-update/:id">
                            {hasAdminRole ? <UserUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/user-new">
                            {hasAdminRole ? <UserNewPage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/user-authority/:id">
                            {hasAdminRole ? <UserAuthorityPage/> : <Redirect to="/" />}
                        </Route>

                    </>
                    :
                    <Redirect to="/login"/>
                }

            </Switch>
        </>
    );
}

export default App;
