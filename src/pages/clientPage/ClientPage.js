import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {useForm} from "react-hook-form";
import axios from "axios";

import './ClientPage.css';

import InputElement from "../../components/inputElement/InputElement";


function ClientPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const [error, toggleError] = useState(false);
    const [clientId, setClientId] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updated, toggleUpdated] = useState(false);

    // const selectStyles = selectStyles();
    const token = localStorage.getItem('token');
    const dropDownList = [];

    const handleChange = e => {
        setClientId(e.value);
    }

    async function onFormSubmit(data) {
        toggleError(false);
        toggleUpdated(false);
        try {
            const result = await axios.post('http://localhost:8080/clients', data,
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

    async function getClients() {
        toggleError(false);
        try {
            const result = await axios.get(`http://localhost:8080/clients/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            setClients(result.data);
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
    }

    useEffect(() => {
        getClients();
    }, [updated]);


    useEffect(() => {
        for (let i = 0; i < clients.length; i++) {
            let fullName = clients[i].firstName + ' ' + clients[i].lastName;
            let dropDownItem = {
                label: fullName,
                value: i
            }
            dropDownList.push(dropDownItem);
        }
    }, [clients, clientId]);


    return (
        <section className="page-container">
            {/*ERROR NOG INBOUWEN + CONTROLE OP DATA*/}
            <h1 className="page-title">Client</h1>
            {/*{loading && <>*/}
            <div className="employee-content">
                <div>
                    <p>Client ID</p>
                    {clientId}
                    <Select
                        options={dropDownList}

                        value={clientId}
                        defaultMenuIsOpen="true"
                        onChange={handleChange}
                        placeholder="Kies uit de lijst ..."
                        id="select"
                    />
                    <div className="retrieve-data">
                        {clientId &&
                            <>
                                <div>{clients[clientId].firstName}</div>
                                <div>{clients[clientId].lastName}</div>
                                <div>{clients[clientId].dateOfBirth}</div>
                                <div>{clients[clientId].enabled.toString()}</div>
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
                        {/*    <inputElement type="radio" name="enabled" display="Actief" id="true"*/}
                        {/*                  checked="checked"/>*/}
                        {/*    <inputElement type="radio" name="enabled" display="Inactief" id="false "/>*/}
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

export default ClientPage;