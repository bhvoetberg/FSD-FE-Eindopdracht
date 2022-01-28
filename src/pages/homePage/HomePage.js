import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

import '../homePage/HomePage.css';

function HomePage() {
    const {isAuth, user} = useContext(AuthContext);


    return (
        <div className="page-container">
            <h1 className="page-title">Home</h1>

            {user.username && <h2>Welkom {user.username},</h2>}

            {isAuth ?
                <>
                    <h3>Op de pagina zijn boven in de menubalk de applicatie-onderdelen verschenen die aan uw gebruikersprofiel zijn toegekend.</h3>
                </>
                :
                <>
                <h3>Deze applicatie is gemaakt als eindopdracht voor de Bootcamp Full Stack Developer aan de NOVI Hogeschool.</h3>
                <h3>Start de backend en log AUB in.</h3>

                </>
            }

        </div>
    );
}

export default HomePage;