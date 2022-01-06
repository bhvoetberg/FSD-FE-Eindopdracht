import React, {useState, useEffect} from "react";
import {Link, useHistory, withRouter} from 'react-router-dom';
import axios from "axios";
import {useForm} from "react-hook-form";


import '../userUpdatePage/UserUpdatePage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";


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
            setIsChecked(result.data.enabled);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    async function onFormSubmit(formdata) {
        let data = {...formdata};
        data.enabled = isChecked;
        console.log("Data");
        console.log(data);
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
        // {data} &&
        <>
            {/*{data.authorities}*/}
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

                    <Link to={"/user-authority/" + props.match.params.id} className="item">
                        <button className="update">Gebruiksrechten</button>
                    </Link>


                    <div className="input-type">
                        <label htmlFor="enabled">
                            Actief
                        </label>
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={isChecked}
                            onChange={(e) => {
                                setIsChecked(e.target.checked)
                            }}
                        />
                    </div>

                    <Button type="submit">
                        Pas aan
                    </Button>

                </form>
            </div>
        </>
    );
}

export default withRouter(UserUpdatePage);