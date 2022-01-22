import React, {useContext} from 'react';

import '../src/App.css';
import {
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
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
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <header>
                <Navigation/>
            </header>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/planning">
                    {isAuth ? <PlanningPage /> : <Redirect to="/login" />}
                    {/*<PlanningPage/>*/}
                </Route>
                <Route exact path="/realisation">
                    <RealisationPage />
                </Route>

                <Route exact path="/employee">
                    <EmployeePage />
                </Route>
                <Route exact path="/employee-update/:id">
                    <EmployeeUpdatePage/>
                </Route>
                <Route exact path="/employee-new">
                    <EmployeeNewPage />
                </Route>

                <Route exact path="/client">
                    <ClientPage />
                </Route>
                <Route exact path="/client-update/:id">
                    <ClientUpdatePage/>
                </Route>
                <Route exact path="/client-new">
                    <ClientNewPage />
                </Route>

                <Route exact path="/medicine">
                    <MedicinePage />
                </Route>
                <Route exact path="/medicine-update/:id">
                    <MedicineUpdatePage/>
                </Route>
                <Route exact path="/medicine-new">
                    <MedicineNewPage />
                </Route>

                <Route exact path="/medication">
                    <MedicationPage />
                </Route>

                <Route exact path="/user">
                    <UserPage/>
                </Route>
                <Route exact path="/user-update/:id">
                    <UserUpdatePage/>
                </Route>
                <Route exact path="/user-new">
                    <UserNewPage />
                </Route>


            </Switch>

        </>
    );
}

export default App;
