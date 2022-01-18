import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {
            username: null,
            id: null,
            authorities: null,
            enabled: null
        },
        status: 'pending',
    });

    const history = useHistory();

    useEffect(() => {
        console.log("UseEffect gestart");
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Token  gevonden")
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            console.log("Token niet gevonden")
            toggleIsAuth({
                isAuth: false,
                user: {},
                status: 'done',
            });
        }
    },[]);

    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        fetchUserData(decoded.sub, JWT);
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: {},
            status: 'done',
        });
        console.log('Gebruiker is uitgelogd!');
        history.push('/login');
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const result = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetched user data");
            console.log(result);
            console.log("isAuth vooraf")
            console.log(isAuth);

            toggleIsAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    id: result.data.id,
                    authorities: result.data.authorities,
                    enabled: result.data.enabled
                },
                status: 'done',
            });
            console.log("isAuth values na toggle");
            console.log(isAuth);


            if (redirectUrl) {
                history.push(redirectUrl);
            }

        } catch (e) {
            console.error(e);

            toggleIsAuth({
                isAuth: false,
                user: {},
                status: 'done',
            });
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.username,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;