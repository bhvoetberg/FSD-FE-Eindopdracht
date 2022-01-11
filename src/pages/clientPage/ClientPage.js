import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useForm} from 'react-hook-form';
import axios from "axios";

import './ClientPage.css';

import InputElement from "../../components/InputElement/InputElement";
import selectStyles from "../../components/SelectStyles/selectStyles";

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


    const handleChange = e => {
        setClientId(e.value);
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
            console.log(result);
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
    }

    useEffect(() => {
        getClients();
    }, [updated]);


    //useState is asynchronous. Resultingly, setClients will not make clients
    //immediately available. Making a dropdownlist now starts only after 'clients' is 'effected'.
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
        <>
            <section className="page-container">
                <h1 className="page-title">Client</h1>
                <div className="employee-content">
                    <div>
                        <Select
                            options={dropDownList}
                            styles={selectStyles}
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
                                    <div>{clients[clientId].dataOfBirth}</div>
                                    <div>{clients[clientId].telPharmacy}</div>
                                    <div>{clients[clientId].telGeneralPractitioner}</div>
                                    <div>{clients[clientId].enabled.toString()}</div>
                                </>
                            }
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)}>
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
                        <label htmlFor="last-name">
                            <input
                                type="text"
                                id="last-name"
                                placeholder="Achternaam"
                                {...register("lastName", {
                                    required: true,
                                    message: "Achternaam is verplicht"
                                })}
                            />
                        </label>
                        <label htmlFor="last-name">
                            <input
                                type="text"
                                id="date-of-birth"
                                placeholder="Geboortedatum"
                                {...register("dateOfBirth", {
                                    required: true,
                                    message: "Geboortedatum verplicht"
                                })}
                            />
                        </label>
                        <label htmlFor="room-number">
                            <input
                                type="text"
                                id="room-number"
                                placeholder="Kamernummer"
                                {...register("roomNumber")}
                            />
                        </label>
                        <label htmlFor="tel-pharmacy">
                            <input
                                type="text"
                                id="tel-pharmacy"
                                placeholder="Telefoonnummer apotheek"
                                {...register("telPharmacy")}
                            />
                        </label>
                        <label htmlFor="tel-general-practitioner">
                            <input
                                type="text"
                                id="tel-general-practitioner"
                                placeholder="Telefoonnummer arts"
                                {...register("telGeneralPractitioner")}
                            />
                        </label>

                        {/*<label htmlFor="enabled">Actief*/}
                        {/*    <input*/}
                        {/*        type="checkbox"*/}
                        {/*        {...register("enabled")}*/}
                        {/*    />*/}
                        {/*</label>*/}

                        <button type="submit">
                            Versturen
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default ClientPage;