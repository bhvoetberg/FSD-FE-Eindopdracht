import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useForm} from 'react-hook-form';
import axios from "axios";

import './ClientPage.css';

import InputElement from "../../components/InputElement/InputElement";
import MultiSelectElement from "../../components/multiSelectElement/MultiSelectElement";


function ClientPage() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [error, toggleError] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [clients, setClients] = useState([]);
    const [updated, toggleUpdated] = useState(false);
    const [radio, setRadio] = useState('put');


    const token = localStorage.getItem('token');
    const dropDownList = [];

    function handleChange(e) {
        console.log("E waarde");
        console.log(e);
        console.log("Werkelijke ID");
        console.log(dropDownList[e.value].value);
        setClientId(dropDownList[e.value].value);
        toggleUpdated(!updated);
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
        if (radio === "post") {
            console.log("Posting is gestart")
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
            console.log("Putting is gestart")
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
        console.log("Haal update van clients");
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
            console.log("Getclients aangeroepen")
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
                value: clients[i].id
            }
            dropDownList.push(dropDownItem);
        }
        console.log("Clients");
        console.log(clients);
        // dropDownList.sort(function (a, b) {
        //     return a.value - b.value;
        // });
        console.log("Dropdown");
        console.log(dropDownList);

    }, [clients, clientId, updated]);


    useEffect(() => {
        //To reset defaultValues in component InputElement
        reset();
    }, [clientId]);


    return (
        <>
            <section className="page-container">
                <h1 className="page-title">Client</h1>

                <p>RADIO {radio}</p>
                <p>CLIENTID in lokale lijst {clientId}</p>




                {/*Gegevens aanpassen of nieuw */}
                <div className="radio-wrapper">
                    <div className="radio">
                        <input type="radio" name="register-mode" checked={radio === "put"} value="put"
                               onChange={(e)=>setRadio(e.target.value)} id="true"/>
                        Aanpassen
                        <input type="radio" name="register-mode" checked={radio === "post"} value="post"
                               onChange={(e)=>setRadio(e.target.value)} id="false "/>
                        Nieuw
                    </div>
                </div>

                {error && <p>Er is iets misgegaan met het laden</p>}

                {(radio === "put") &&
                    <>
                        <div className="client-content">
                            <Select
                                options={dropDownList}
                                styles={selectStyles}
                                defaultMenuIsOpen="false"
                                onChange={handleChange}
                                placeholder="Kies uit de lijst ..."
                                id="select"
                            />
                        </div>
                    </>
                }

                {clientId > 0 &&
                    <>
                        <form name="client-input" onSubmit={handleSubmit(onFormSubmit)}>
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

                            {/*<InputElement*/}
                            {/*    errors={errors}*/}
                            {/*    register={register}*/}
                            {/*    name="lastName"*/}
                            {/*    value={clients[clientId].lastName}*/}
                            {/*    placeholder="Achternaam"*/}
                            {/*    inputType="text"*/}
                            {/*    validationRules={{*/}
                            {/*        required: "Achternaam is verplicht"*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<InputElement*/}
                            {/*    errors={errors}*/}
                            {/*    register={register}*/}
                            {/*    name="roomNumber"*/}
                            {/*    value={clients[clientId].roomNumber}*/}
                            {/*    placeholder="Kamernummer"*/}
                            {/*    inputType="text"*/}
                            {/*    validationRules={{*/}
                            {/*        required: "Kamernummer is verplicht"*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<InputElement*/}
                            {/*    errors={errors}*/}
                            {/*    register={register}*/}
                            {/*    name="dateOfBirth"*/}
                            {/*    value={clients[clientId].dateOfBirth}*/}
                            {/*    placeholder="Geboortedatum"*/}
                            {/*    inputType="text"*/}
                            {/*    validationRules={{*/}
                            {/*        required: "Geboortedatum is verplicht"*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<InputElement*/}
                            {/*    errors={errors}*/}
                            {/*    register={register}*/}
                            {/*    name="telPharmacy"*/}
                            {/*    value={clients[clientId].telPharmacy}*/}
                            {/*    placeholder="Telefoon apotheek"*/}
                            {/*    inputType="text"*/}
                            {/*    validationRules={{*/}
                            {/*        required: "Telefoon apotheek is verplicht"*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<InputElement*/}
                            {/*    errors={errors}*/}
                            {/*    register={register}*/}
                            {/*    name="telGeneralPractitioner"*/}
                            {/*    value={clients[clientId].telGeneralPractitioner}*/}
                            {/*    placeholder="Telefoon arts"*/}
                            {/*    inputType="text"*/}
                            {/*    validationRules={{*/}
                            {/*        required: "Telefoon arts is verplicht"*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*{(radio === "put") &&*/}
                            {/*    <>*/}
                            {/*        <InputElement*/}
                            {/*            errors={errors}*/}
                            {/*            register={register}*/}
                            {/*            name="id"*/}
                            {/*            value={clients[clientId].id}*/}
                            {/*            placeholder="id "*/}
                            {/*            inputType="text"*/}
                            {/*        />*/}
                            {/*</>}*/}


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
                    </>}

            </section>
        </>
    );
}

export default ClientPage