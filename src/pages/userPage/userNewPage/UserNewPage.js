import React from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import '../userNewPage/UserNewPage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";
import MultiSelectElement from "../../../components/multiSelectElement/MultiSelectElement";


function UserNewPage() {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    // const [data, setData] = useState([]);
    let data = {};

    const history = useHistory();

    async function onFormSubmit(data) {
        try {
            const result = await axios.post('http://localhost:8080/users/', data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            history.push('/user');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">User nieuw</h1>
                <form className="content" name="user-input" onSubmit={handleSubmit(onFormSubmit)}>
                    <InputElement
                        errors={errors}
                        register={register}
                        name="username"
                        label="Gebruikersnaam"
                        inputType="text"
                        value={data.username}
                        validationRules={{
                            required: "Username is verplicht",
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="password"
                        label="Wachtwoord"
                        inputType="text"
                        value={data.password}
                        validationRules={{
                            required: "Wachtwoord is verplicht",
                        }}
                    />

                    <InputElement
                        errors={errors}
                        register={register}
                        name="email"
                        label="email"
                        inputType="text"
                        value={data.email}
                        validationRules={{
                            required: "Email is verplicht",
                        }}
                    />

                    <MultiSelectElement
                        errors={errors}
                        register={register}
                        name="enabled"
                        label="Actief"
                        value={data.enabled}
                        selectType="checkbox"
                    />


                    <Button type="submit">
                        Update
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(UserNewPage);