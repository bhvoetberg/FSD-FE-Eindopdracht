import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";


function HomePage() {
    const {user} = useContext(AuthContext);
    console.log("HomePage");
    console.log(user);

    useEffect(() => {
        console.log(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="page-container">
            <h1>Home</h1>
            {user && <p>Hoi {user.username}</p>}
        </div>
    );
}

export default HomePage;