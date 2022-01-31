import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";

import '../homePage/HomePage.css';
import axios from "axios";


function HomePage() {
    const {isAuth, user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    async function getData() {
        if (isAuth) {
            try {
                let result = await axios.get(`http://localhost:8080/users/`+ user.username, {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    },
                });
                result = await result.data;
                setData(result);
            } catch (e) {
                console.error(e);
            }
        }
    }


    return (
        <div className="page-container">
            <h1 className="page-title">Home</h1>

            {(isAuth && data) ?
                <>
                    {user.username && <h2>Welkom {data.employee.firstName} {data.employee.lastName},</h2>}
                    <h3>Op de pagina zijn boven in de menubalk de applicatie-onderdelen verschenen die aan uw
                        gebruikersprofiel zijn toegekend.</h3>
                </>
                :
                <>
                    <h3>Deze applicatie is gemaakt als eindopdracht voor de Bootcamp Full Stack Developer aan de NOVI
                        Hogeschool.</h3>
                    <h3>Start de backend en log AUB in.</h3>

                </>
            }

        </div>
    );
}

export default HomePage;