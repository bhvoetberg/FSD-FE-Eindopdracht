import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import Select from "react-select";

import './ClientPage.css';

import InputElement from "../../components/inputElement/InputElement";

function ClientPage() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [error, toggleError] = useState(false);
    const [clientId, setClientId] = useState(1);
    const [clients, setClients] = useState([]);
    const [updated, toggleUpdated] = useState(false);
    const [radio, setRadio] = useState('put');


    const token = localStorage.getItem('token');

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
        //To reset defaultValues in component inputElement
        reset();
    }, [clientId]);


    // const Select = ({value, options, onChange }) => {
    //     return (
    //         <select value={value} onChange={onChange}>
    //             {options.map(option => {
    //                 return (<option key={option.value} value={option.value} >{option.firstName} {option.lastName}</option>);
    //             })}
    //         </select>
    //     );
    // };
    //
    // const handleChange = e => setClientId(e.target.value);



    return (
        <>
            <section className="page-container">
                <h1 className="page-title">Client</h1>

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

                    <Select options={clients} />
                    // <>
                    //     <Select value={clientId} options={clients} field1="firstName" field2="lastName" onChange={handleChange} />
                    // </>
                }

                {false &&
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

                            {/*<inputElement*/}
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
                            {/*<inputElement*/}
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
                            {/*<inputElement*/}
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
                            {/*<inputElement*/}
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
                            {/*<inputElement*/}
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
                            {/*        <inputElement*/}
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