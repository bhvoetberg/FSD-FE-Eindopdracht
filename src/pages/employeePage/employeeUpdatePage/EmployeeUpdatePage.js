import React, {useState, useEffect} from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";
import MultiSelectElement from "../../../components/multiSelectElement/MultiSelectElement";

import '../employeeUpdatePage/EmployeeUpdatePage.css';


function EmployeeUpdatePage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const photo = {
        photo: null
    }
    const history = useHistory();

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/employees/` + props.match.params.id, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            result = await result.data;
            setData(result);
        } catch (e) {
            console.error(e);
        }
    }

    async function onFormSubmit(data) {
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


    //   async function submit(data) {
    //     try {
    //         const result = await axios.patch('http://localhost:8080/clients/' + props.match.params.id,
    //             data,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json", Authorization: `Bearer ${token}`,
    //                 }
    //             });
    //         console.log(result);
    //         await getData();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }


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
                        Pas aan
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(EmployeeUpdatePage);