import React, {useState, useEffect} from "react";
import {useHistory, withRouter} from 'react-router-dom';
import axios from "axios";
import {useForm} from "react-hook-form";


import '../userUpdatePage/UserUpdatePage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";
import MultiSelectElement from "../../../components/multiSelectElement/MultiSelectElement";


function UserUpdatePage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getData() {
        try {
            const result = await axios.get(`http://localhost:8080/users/` + props.match.params.id, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            const received =  await result.data;
            setData(received);
        } catch (e) {
            console.error(e);
        }
    }

    async function onFormSubmit(data) {
        try {
            const result = await axios.put('http://localhost:8080/users/' + props.match.params.id, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            history.push('/user');
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">User update</h1>
                <form className="content" name="client-input" onSubmit={handleSubmit(onFormSubmit)}>
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
                        inputType="password"
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

export default withRouter(UserUpdatePage);