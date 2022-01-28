import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css';
import {AuthContext} from "../../context/AuthContext";
import {logDOM} from "@testing-library/react";

function Navigation() {
    const {isAuth, user} = useContext(AuthContext);
    const [hasUserRole, setHasUserRole] = useState(false);
    const [hasAdminRole, setHasAdminRole] = useState(false);

    console.log(user.length);


    // if (!user.isEmpty() {
    //     setHasUserRole(user.authorities.some(item =>
    //         item.authority === "ROLE_ADMIN"));
    //     setHasAdminRole(user.authorities.some(item =>
    //         item.authority === "ROLE_ADMIN"));
    // }
    // console.log(hasUserRole);
    // console.log(hasAdminRole);


    return (
        <nav>
            <div className="navigation-container">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    {isAuth ?
                        <>
                            {/*{hasUserRole &&*/}
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
                                </>
                            {/*}*/}
                            {/*{hasAdminRole &&*/}
                                <>
                                    <li>
                                        <NavLink to="/user" activeClassName="active-link">User</NavLink>
                                    </li>
                                </>
                            {/*}*/}
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