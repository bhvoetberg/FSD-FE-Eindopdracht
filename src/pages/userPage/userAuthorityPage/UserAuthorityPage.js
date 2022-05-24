import React, {useState, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";

import '../userAuthorityPage/UserAuthorityPage.css';

function UserAuthorityPage(props) {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const url = 'http://localhost:8080/users/' + props.match.params.id + `/authorities/`;

    const [inactiveRoles, setInactiveRoles] = useState([]);
    const [updatedRoles, toggleUpdatedRoles] = useState(false);

    const allRoles = [
        "ROLE_USER",
        "ROLE_ADMIN",
        "ROLE_SUPERVISOR"
    ];

    function defineInactiveRoles(received) {
        let activeRoles = [];
        for (let i = 0; i < received.length; i++) {
            activeRoles.push(received[i].authority)
        }
        let tempRoles = []
        for (let i = 0; i < allRoles.length; i++) {
            if (activeRoles.includes(allRoles[i]) === false) {
                tempRoles.push(allRoles[i]);
            }
        }
        setInactiveRoles(tempRoles);
    }


    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedRoles]);


    async function getData() {
        try {
            const result = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            const received = await result.data;
            setData(received);
            defineInactiveRoles(received);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteAuthority(authority) {
        try {
            const result = await axios.delete(url + authority,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            toggleUpdatedRoles(!updatedRoles);
        } catch (e) {
            console.log(e);
        }
    }

    async function addAuthority(authority) {
        let data = {
            authority: authority
        }

        try {
            const result = await axios.post(url, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            toggleUpdatedRoles(!updatedRoles);
            // history.push('/user');
        } catch (e) {
            console.error(e);
        }
    }

    return ({data} &&
        <div className="page-container">
            <h1 className="page-title">Gebruiksrechten</h1>
            <div className="content">
                <p><strong>Actieve rollen</strong></p>
                {data.map((item) =>
                    <ul key={item.id}>
                        <p>{item.authority}</p>
                        <button className="update" onClick={() => deleteAuthority(item.authority)}>Verwijderen</button>
                    </ul>
                )}
                <p><strong>Inactieve rollen</strong></p>
                {inactiveRoles.map((item) =>
                    <ul key={item.id}>
                        <p>{item}</p>
                        <button className="update" onClick={() => addAuthority(item)}>Toevoegen</button>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default withRouter(UserAuthorityPage);