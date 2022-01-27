import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";


function HomePage() {
    // const {user} = useContext(AuthContext);
    const {isAuth, user} = useContext(AuthContext);
    console.log("HomePage");
    console.log("User =")
    console.log(user.authorities);

    useEffect(() => {
        console.log(user.authorities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="page-container">
            <h1 className="page-title">Home</h1>

            {user.username && <text>Welkom {user.username},</text>}

            {isAuth ?
                <>
                    <text>Op de pagina zijn rechtsbovenin de applicatie-onderdelen verschenen die aan uw gebruikersprofiel zijn toegekend.</text>

                </>
                :
                <>
                <text>Deze applicatie is gemaakt als eindopdracht voor de Bootcamp Full Stack Developer aan de NOVI Hogeschool.</text>
                <text>Start de backend en log AUB in.</text>

                </>
            }

        </div>
    );
}

export default HomePage;