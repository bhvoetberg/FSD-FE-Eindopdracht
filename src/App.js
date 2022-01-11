import React, {useContext} from 'react';
import '../src/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import PlanningPage from './pages/planningPage/PlanningPage';
import RealisationPage from './pages/realisationPage/RealisationPage';
import EmployeePage from './pages/employeePage/EmployeePage';
import ClientPage from './pages/clientPage/ClientPage';
import MedicinePage from './pages/medicinePage/MedicinePage';
import MedicationPage from './pages/medicationPage/MedicationPage';
import Navigation from "./components/Navigation/Navigation";


function App() {
    const {isAuth} = useContext(AuthContext);

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
                <Route exact path="/planning">
                    {isAuth ? <PlanningPage /> : <Redirect to="/" />}
                    {/*<PlanningPage/>*/}
                </Route>
                <Route exact path="/realisation">
                    <RealisationPage/>
                </Route>
                <Route exact path="/employee">
                    <EmployeePage/>
                </Route>
                <Route exact path="/client">
                    <ClientPage/>
                </Route>
                <Route exact path="/medicine">
                    <MedicinePage/>
                </Route>
                <Route exact path="/medication">
                    <MedicationPage/>
                </Route>
            </Switch>

        </>
    );
}

export default App;
