import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';

import '../loginPage/LoginPage.css';
import InputElement from "../../components/inputElement/InputElement";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login, isAuth, logout} = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const history = useHistory();


    async function onFormSubmit(data) {
        try {
            const result = await axios.post('http://localhost:8080/authenticate', data);
            login(result.data.jwt);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        // history.push('/');
    }

    return (
        <section className="page-container">
            {isAuth ?

                <>
                    <h1 className="page-title">Uitloggen</h1>
                    <button
                        type="submit"
                        className="form-button"
                        onClick={logout}
                    >
                        Uitloggen
                    </button>
                </>

                :

                <>
                    <h1 className="page-title">Inloggen</h1>

                    <form className="content" name="user-input" onSubmit={handleSubmit(onFormSubmit)}>
                        <InputElement
                            errors={errors}
                            register={register}
                            name="username"
                            value={username}
                            label="Gebruikersnaam"
                            inputType="text"
                            validationRules={{
                                required: "Username is verplicht",
                            }}
                        />
                        <InputElement
                            errors={errors}
                            register={register}
                            name="password"
                            value={password}
                            label="Wachtwoord"
                            inputType="text"
                            validationRules={{
                                required: "Wachtwoord is verplicht",
                            }}
                        />
                        <button
                            type="submit"
                            className="form-button"
                        >
                            Inloggen
                        </button>
                        {error && <p className="error">Combinatie van gebruikersnaam en wachtwoord is onjuist!</p>}

                    </form>
                </>
            }
        </section>
    );
}

export default LoginPage;