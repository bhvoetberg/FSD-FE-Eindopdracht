import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";


function HomePage() {
    const {user} = useContext(AuthContext);
    const {isAuth} = useContext(AuthContext);
    console.log("HomePage");
    console.log(user);

    useEffect(() => {
        console.log(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="page-container">
            <h1 className="page-title">Home</h1>
            <h2>Welkom</h2>

            {user && <p>Hoi {user.username}</p>}

            {isAuth ?
                <>
                    <text>Op de pagina zijn rechtsbovenin de applicatie-onderdelen verschenen die aan uw gebruikersprofiel zijn toegekend.</text>
                </>
                :
                <>
                    <text>Deze applicatie is gemaakt als eindopdracht voor de Bootcamp Full Stack Developer aan de NOVI Hogeschool. Log AUB in.</text>

                </>
            }




        </div>
    );
}

export default HomePage;