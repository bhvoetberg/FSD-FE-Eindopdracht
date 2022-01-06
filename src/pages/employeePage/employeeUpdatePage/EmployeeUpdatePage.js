import React, {useState, useEffect} from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";

import '../employeeUpdatePage/EmployeeUpdatePage.css';


function EmployeeUpdatePage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const [isChecked, setIsChecked] = useState(null);
    const history = useHistory();

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/employees/` + props.match.params.id, {
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

    async function onFormSubmit(formdata) {
        let data = {...formdata};
        data.enabled = isChecked;
        try {
            const result = await axios.put('http://localhost:8080/employees/' + props.match.params.id, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            history.push('/employee');
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">Employee update</h1>
                <form className="content" name="employee-input" onSubmit={handleSubmit(onFormSubmit)}>

                    <InputElement
                        errors={errors}
                        register={register}
                        name="firstName"
                        label="Voornaam"
                        inputType="text"
                        value={data.firstName}
                        validationRules={{
                            required: "Voornaam is verplicht",
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="lastName"
                        label="Achternaam"
                        inputType="text"
                        value={data.lastName}
                        validationRules={{
                            required: "Achternaam is verplicht",
                        }}
                    />

                    <InputElement
                        errors={errors}
                        register={register}
                        name="functionName"
                        label="Functie"
                        inputType="text"
                        value={data.functionName}
                    />

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

        </div>
    );
}

export default withRouter(EmployeeUpdatePage);