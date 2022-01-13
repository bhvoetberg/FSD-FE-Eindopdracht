import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {useForm} from "react-hook-form";
import axios from "axios";

import './EmployeePage.css';

import InputElement from "../../components/InputElement/InputElement";
import selectStyles from "../../components/selectStyles/selectStyles";


function EmployeePage() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const [error, toggleError] = useState(false);
    const [employeeId, setEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updated, toggleUpdated] = useState(false);

    // const selectStyles = selectStyles();
    const token = localStorage.getItem('token');
    const dropDownList = [];


    async function onFormSubmit(data) {
        toggleError(false);
        toggleUpdated(false);
        try {
            const result = await axios.post('http://localhost:8080/employees', data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log("RESULTAAT POST");
            console.log(result);
            toggleUpdated(true);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }


    const handleChange = e => {
        setEmployeeId(e.value);
    }


    async function getEmployees() {
        toggleError(false);
        try {
            const result = await axios.get(`http://localhost:8080/employees/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            setEmployees(result.data);
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
    }

    useEffect(() => {
        getEmployees();
    }, [updated]);


    useEffect(() => {
        for (let i = 0; i < employees.length; i++) {
            let fullName = employees[i].firstName + ' ' + employees[i].lastName;
            let dropDownItem = {
                label: fullName,
                value: i
            }
            dropDownList.push(dropDownItem);
        }
    }, [employees, employeeId]);


    return (
        <section className="page-container">
            {/*ERROR NOG INBOUWEN + CONTROLE OP DATA*/}
            <h1 className="page-title">Medewerker</h1>
            {/*{loading && <>*/}
            <div className="employee-content">
                <div>
                    <Select
                        options={dropDownList}
                        styles={selectStyles}
                        value={employeeId}
                        defaultMenuIsOpen="true"
                        onChange={handleChange}
                        placeholder="Kies uit de lijst ..."
                        id="select"
                    />
                    <div className="retrieve-data">
                        {employeeId &&
                            <>
                                <div>{employees[employeeId].firstName}</div>
                                <div>{employees[employeeId].lastName}</div>
                                <div>{employees[employeeId].functionName}</div>
                                <div>{employees[employeeId].enabled.toString()}</div>
                            </>
                        }
                    </div>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="update-data">
                        <InputElement
                            errors={errors}
                            register={register}
                            name="firstName"
                            placeholder="Voornaam"
                            inputType="text"
                            validationRules={{
                                required: "Voornaam is verplicht"
                            }}
                        />
                        <InputElement
                            errors={errors}
                            register={register}
                            name="lastName"
                            placeholder="Voornaam"
                            inputType="text"
                            validationRules={{
                                required: "Achternaam is verplicht"
                            }}
                        />
                        <InputElement
                            errors={errors}
                            register={register}
                            name="function"
                            placeholder="Functie"
                            inputType="text"
                        />

                        {/*<div className="radio">*/}
                        {/*    <InputElement type="radio" name="enabled" display="Actief" id="true"*/}
                        {/*                  checked="checked"/>*/}
                        {/*    <InputElement type="radio" name="enabled" display="Inactief" id="false "/>*/}
                        {/*</div>*/}
                    </div>
                    <button type="submit">
                        Verzenden
                    </button>
                </form>
            </div>
            {/*</>}*/}
        </section>
    );
}

export default EmployeePage;