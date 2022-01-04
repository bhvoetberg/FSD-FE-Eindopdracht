import React from 'react';
import {NavLink} from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <div className="navigation-container">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" activeClassName="active-link">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/planning" activeClassName="active-link">Planning</NavLink>
                    </li>
                    <li>
                        <NavLink to="/realisation" activeClassName="active-link">Uitvoering</NavLink>
                    </li>
                    <li>
                        <NavLink to="/employee" activeClassName="active-link">Medewerker</NavLink>
                    </li>
                    <li>
                        <NavLink to="/client" activeClassName="active-link">Client</NavLink>
                    </li>
                    <li>
                        <NavLink to="/medicine" activeClassName="active-link">Medicijn</NavLink>
                    </li>
                    <li>
                        <NavLink to="/medicationplanning" activeClassName="active-link">Medicatieplanning</NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Navigation;