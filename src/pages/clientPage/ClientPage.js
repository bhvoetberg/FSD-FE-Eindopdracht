import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useForm} from 'react-hook-form';
import axios from "axios";

import './ClientPage.css';

import InputElement from "../../components/InputElement/InputElement";
import MultiSelectElement from "../../components/MultiSelectElement/MultiSelectElement";


function ClientPage() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [error, toggleError] = useState(false);
    const [clientId, setClientId] = useState('');
    const [clients, setClients] = useState([]);
    const [updated, toggleUpdated] = useState(false);
    const checked = true;

    const token = localStorage.getItem('token');
    const dropDownList = [];

    const handleChange = e => {
        console.log("Value on change select");
        console.log(e.value);
        setClientId(e.value);
        toggleUpdated(!updated);
    }

    const handleChangeRadio = e => {
        checked = !checked;
    }

    // T.b.v. React-Select
    const selectStyles = {
        control: (base, state) => ({
            ...base,
            color: "var(--primary-color)",
            background: "var(--offwhite-color)",
            borderRadius: state.isFocused ? "2rem" : "2rem",
            borderColor: state.isFocused ? "var(--primary-color)" : "var(--primary-color)",
            // boxShadow: state.isFocused ? null : null,
            "&:hover": {
                borderColor: state.isFocused ? "var(--primary-color)" : "var(--primary-color)"
            }
        }),
        menu: (base) => ({
            ...base,
            borderRadius: 0,
            marginTop: 0
        }),
        menuList: (base) => ({
            ...base,
            padding: 0
        })
    };


    async function onFormSubmit(data) {
        toggleError(false);
        toggleUpdated(false);
        if (checked === false) {
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
        } else {
            let RecordId = clientId - 1;
            console.log('put element');
            console.log(data);
            console.log(data.id);
            console.log(data[RecordId]);
            try {
                const result = await axios.put('http://localhost:8080/clients/2', data,
                    {
                        headers: {
                            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                        }
                    });
                console.log("RESULTAAT PUT");
                console.log(result);
                toggleUpdated(true);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }
        getClients();
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


    useEffect(() => {
        //To reset defaultValues in component InputElement
        reset();
    }, [clientId]);


    return (
        <>
            <section className="page-container">
                <h1 className="page-title">Client</h1>

                {/*Gegevens aanpassen of nieuw */}
                <div className="radio-wrapper">
                    <MultiSelectElement
                        errors={errors}
                        register={register}
                        name="radio"
                        label="Aanpassen"
                        selectType="radio"
                        defaultChecked="true"
                    />
                    <MultiSelectElement
                        errors={errors}
                        register={register}
                        name="radio"
                        label="Nieuw"
                        selectType="radio"
                    />

                    {/*<div className="radio">*/}
                    {/*    <input type="radio" name="register-mode" display="Actief" id="true"*/}
                    {/*           defaultChecked="true"/>*/}
                    {/*    Aanpassen*/}
                    {/*    <input type="radio" name="register-mode" display="Inactief" id="false "/>*/}
                    {/*    Nieuw*/}
                    {/*</div>*/}
                </div>

                {error && <p>Er is iets misgegaan met het laden</p>}

                <div className="client-content">
                    <Select
                        options={dropDownList}
                        styles={selectStyles}
                        value={clientId}
                        defaultMenuIsOpen="false"
                        onChange={handleChange}
                        placeholder="Kies uit de lijst ..."
                        id="select"
                    />
                </div>


                {clientId > 0 &&
                    <>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <InputElement
                                errors={errors}
                                register={register}
                                name="firstName"
                                value={clients[clientId].firstName}
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
                                value={clients[clientId].lastName}
                                placeholder="Achternaam"
                                inputType="text"
                                validationRules={{
                                    required: "Achternaam is verplicht"
                                }}
                            />
                            <InputElement
                                errors={errors}
                                register={register}
                                name="roomNumber"
                                value={clients[clientId].roomNumber}
                                placeholder="Kamernummer"
                                inputType="text"
                                validationRules={{
                                    required: "Kamernummer is verplicht"
                                }}
                            />
                            <InputElement
                                errors={errors}
                                register={register}
                                name="dateOfBirth"
                                value={clients[clientId].dateOfBirth}
                                placeholder="Geboortedatum"
                                inputType="text"
                                validationRules={{
                                    required: "Geboortedatum is verplicht"
                                }}
                            />
                            <InputElement
                                errors={errors}
                                register={register}
                                name="telPharmacy"
                                value={clients[clientId].telPharmacy}
                                placeholder="Telefoon apotheek"
                                inputType="text"
                                validationRules={{
                                    required: "Telefoon apotheek is verplicht"
                                }}
                            />
                            <InputElement
                                errors={errors}
                                register={register}
                                name="telGeneralPractitioner"
                                value={clients[clientId].telGeneralPractitioner}
                                placeholder="Telefoon arts"
                                inputType="text"
                                validationRules={{
                                    required: "Telefoon arts is verplicht"
                                }}
                            />
                            <InputElement
                                errors={errors}
                                register={register}
                                name="id"
                                value={clients[clientId].id}
                                placeholder="id "
                                inputType="text"
                                validationRules={{
                                    required: "Telefoon arts is verplicht"
                                }}
                            />

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
                    </>}

            </section>
        </>
    );
}

export default ClientPage;