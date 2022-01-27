import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css';
import {AuthContext} from "../../context/AuthContext";

function Navigation() {
    const {isAuth, user} = useContext(AuthContext);

       return (
        <nav>
            <div className="navigation-container">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    {isAuth ?
                        <>
                            <li>
                                <NavLink to="/planning" activeClassName="active-link">Planning</NavLink>
                            </li>
                            <li>
                                <NavLink to="/medicine" activeClassName="active-link">Medicijn</NavLink>
                            </li>
                            <li>
                                <NavLink to="/medication" activeClassName="active-link">Medicatie</NavLink>
                            </li>

                            <li>
                                <NavLink to="/client" activeClassName="active-link">Client</NavLink>
                            </li>
                            <li>
                                <NavLink to="/employee" activeClassName="active-link">Medewerker</NavLink>
                            </li>
                            <li>
                                <NavLink to="/user" activeClassName="active-link">User</NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" activeClassName="active-link">Uitloggen</NavLink>
                            </li>
                        </>
                        :
                        <li>
                            <NavLink to="/login" activeClassName="active-link">Inloggen</NavLink>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;