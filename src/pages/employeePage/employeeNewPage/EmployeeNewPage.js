import React from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import '../employeeNewPage/EmployeeNewPage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";
import MultiSelectElement from "../../../components/multiSelectElement/MultiSelectElement";


function EmployeeNewPage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    // const [data, setData] = useState([]);
    let data = {};
    const history = useHistory();

    async function onFormSubmit(data) {
        try {
            const result = await axios.post('http://localhost:8080/employees/', data,
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

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">Employee nieuw</h1>
                <form className="content" name="employee-input" onSubmit={handleSubmit(onFormSubmit)}>
                    <InputElement
                        errors={errors}
                        register={register}
                        name="firstName"
                        label="Voornaamnaam"
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
                        name="function"
                        label="Functie"
                        inputType="text"
                        value={data.function}
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
                        Voeg toe
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(EmployeeNewPage);