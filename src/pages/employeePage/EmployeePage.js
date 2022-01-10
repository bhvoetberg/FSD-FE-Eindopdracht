import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {set, useForm} from "react-hook-form";
import axios from "axios";

import './EmployeePage.css';

import InputElement from "../../components/InputElement/InputElement";
import selectStyles from "../../helpers/selectStyles";



function EmployeePage() {
    const { register, handleSubmit } = useForm();

    const [error, toggleError] = useState(false);
    const [employeeId, setEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const selectedStyles = selectStyles();
    const token = localStorage.getItem('token');
    const dropDownList = [];


    function onFormSubmit(data) {
        console.log(data);
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
    }, []);



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
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <Select
                                options={dropDownList}
                                styles={selectedStyles}
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
                        </form>

                        <form>
                            <InputElement type="button" name="update" placeholder="update" id="update"/>
                            <div className="update-data">
                                <InputElement type="text" name="firstname" placeholder="Voornaam" id="firstname"/>
                                <InputElement type="text" name="lastname" placeholder="Achternaam" id="lastname"/>
                                <InputElement type="text" name="function" placeholder="Functie" id="function"/>
                                <div className="radio">
                                    <InputElement type="radio" name="enabled" display="Actief" id="true"
                                                  checked="checked"/>
                                    <InputElement type="radio" name="enabled" display="Inactief" id="false "/>
                                </div>
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