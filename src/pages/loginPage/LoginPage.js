import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const result = await axios.post('http://localhost:8080/authenticate', {
                username: username,
                password: password,
            });

            // geef de JWT token aan de login-functie van de context mee

            login(result.data.jwt);

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <section className="page-container">
            <h1 className="page-title">Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email-field">
                    <input
                        type="user"
                        id="user-field"
                        name="username"
                        value={username}
                        placeholder="gebruikersnaam"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label htmlFor="password-field">
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        placeholder="wachtwoord"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error">Combinatie van gebruikersnaam en wachtwoord is onjuist!</p>}

                <button
                    type="submit"
                    className="form-button"
                >
                    Inloggen
                </button>
            </form>

        </section>
    );
}

export default LoginPage;