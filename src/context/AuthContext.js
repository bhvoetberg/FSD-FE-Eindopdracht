import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {},
        status: 'pending',
    });

    const history = useHistory();

    useEffect(() => {
        // console.log("UseEffect gestart");
        const token = localStorage.getItem('token');
        if (token) {
            // console.log("Token  gevonden")
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            // console.log("Token niet gevonden")
            toggleIsAuth({
                isAuth: false,
                user: {},
                status: 'done',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    id: result.data.id,
                    authorities: result.data.authorities,
                    enabled: result.data.enabled
                },
                status: 'done',
            });

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
        user: isAuth.user,
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