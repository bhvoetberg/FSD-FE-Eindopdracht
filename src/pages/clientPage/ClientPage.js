import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useForm} from 'react-hook-form';
import axios from "axios";

import OnFormSubmit from "../../helpers/useOnFormSubmit";

import './ClientPage.css';

import InputElement from "../../components/InputElement/InputElement";
import selectStyles from "../../helpers/selectStyles";

function ClientPage() {
    const {register, handleSubmit} = useForm();

    const [error, toggleError] = useState(false);
    const [clientId, setClientId] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    const selectedStyles = selectStyles();
    const token = localStorage.getItem('token');
    const dropDownList = [];

    async function onFormSubmit(data) {
        toggleError(false);
        try {
            const result = await axios.post('http://localhost:8080/clients', data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log("RESULTAAT POST");
            console.log(result);
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
            console.log("Opgehaald is:");
            console.log(result);
        } catch (e) {
            toggleError(true);
            console.error(e);
        }
    }

    useEffect(() => {
        getClients();
    }, []);


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
            <div className="page-container">
                <h1 className="page-title">Client</h1>
                <div className="employee-content">
                    <div>
                        <Select
                            options={dropDownList}
                            styles={selectedStyles}
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

                        <label htmlFor="first-name">
                            <input
                                type="text"
                                id="first-name"
                                placeholder="Voornaam"
                                {...register("firstName")}
                            />
                        </label>
                        <label htmlFor="last-name">
                            <input
                                type="text"
                                id="last-name"
                                placeholder="Achternaam"
                                {...register("lastName")}
                            />
                        </label>
                        <label htmlFor="data-of-birth">
                            <input
                                type="text"
                                id="date-of-birth"
                                placeholder="Geboortedatum"
                                {...register("dateOfBirth")}
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
                                placeholder="Telefoon apotheek"
                                {...register("telPharmacy")}
                            />
                        </label>
                        <label htmlFor="tel-general-practitioner">
                            <input
                                type="text"
                                id="tel-general-practitioner"
                                placeholder="Telefoon huisarts"
                                {...register("telGeneralPractitioner")}
                            />
                        </label>

                        <label htmlFor="enabled">Actief
                            <input
                                type="checkbox"
                                {...register("enabled")}
                            />
                        </label>

                        <button type="submit">
                            Versturen
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ClientPage;