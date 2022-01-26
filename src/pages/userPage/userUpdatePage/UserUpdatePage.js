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
    const [isChecked, setIsChecked] = useState(null);
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
            const received = await result.data;
            setData(received);
            setIsChecked(received.enabled);
        } catch (e) {
            console.error(e);
        }
    }

    async function onFormSubmit(data) {
        console.log("Te posten data");
        console.log(props.match.params.id);
        console.log(data)
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
                    <div className="username">
                        <p>Gebruikersnaam </p>
                        <div>{data.username}</div>
                    </div>

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
                        validationRules={{}}
                    />

                    <div className="input-type">
                        <label htmlFor="enabled-field">
                            Actief
                        </label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                                setIsChecked(e.target.checked)
                            }}
                        />
                    </div>

                    <Button type="submit">
                        Update
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(UserUpdatePage);