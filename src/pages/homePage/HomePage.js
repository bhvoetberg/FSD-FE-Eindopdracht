import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {decode as base64_decode, encode as base64_encode} from 'base-64';


function HomePage() {
    const {user} = useContext(AuthContext);
    console.log("HomePage");
    console.log(user);


    function uploadImage(e) {

    }


    return (
        <div className="page-container">
            <h1>Home</h1>
            {user && <p>Hoi {user.username}</p>}
        </div>


    );
}


export default HomePage;