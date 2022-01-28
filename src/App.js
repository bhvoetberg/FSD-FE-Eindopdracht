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

import UserPage from './pages/userPage/UserPage';
import UserNewPage from "./pages/userPage/userNewPage/UserNewPage";
import UserUpdatePage from './pages/userPage/userUpdatePage/UserUpdatePage'

import Navigation from "./components/navigation/Navigation";

function App() {
    const {isAuth, user} = useContext(AuthContext);
    const [hasUserRole, setHasUserRole] = useState(false);
    const [hasAdminRole, setHasAdminRole] = useState(false);

    useEffect(() => {
        if (isAuth) {
            setHasUserRole(user.authorities.some(item =>
                item.authority === "ROLE_USER"));
            setHasAdminRole(user.authorities.some(item =>
                item.authority === "ROLE_ADMIN"));
        };
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
                            {hasUserRole ? <EmployeePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/employee-update/:id">
                            {hasUserRole ? <EmployeeUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/employee-new">
                            {hasUserRole ? <EmployeeNewPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/client">
                            {hasUserRole ? <ClientPage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/client-update/:id">
                            {hasUserRole ? <ClientUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/client-new">
                            {hasUserRole ? <ClientNewPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/medicine">
                            {hasUserRole ? <MedicinePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/medicine-update/:id">
                            {hasUserRole ? <MedicineUpdatePage/> : <Redirect to="/" />}
                        </Route>
                        <Route exact path="/medicine-new">
                            {hasUserRole ? <MedicineNewPage/> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/medication">
                            {hasUserRole ? <MedicationPage/> : <Redirect to="/" />}
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

                    </>
                    :
                    <Redirect to="/login"/>
                }

            </Switch>
        </>
    );
}

export default App;
