import React from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import './ClientNewPage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";
import MultiSelectElement from "../../../components/multiSelectElement/MultiSelectElement";

function ClientNewPage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });

    let data = {};
    const history = useHistory();

    async function onFormSubmit(data) {
        try {
            const result = await axios.post('http://localhost:8080/clients/', data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            history.push('/client');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">Client nieuw</h1>
                <form className="content" name="client-input" onSubmit={handleSubmit(onFormSubmit)}>
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
                        name="dateOfBirth"
                        label="Geboortedatum"
                        inputType="text"
                        value={data.dateOfBirth}
                        validationRules={{
                            required: "Geboortedatum  is verplicht",
                        }}
                    />

                    <MultiSelectElement
                        errors={errors}
                        register={register}
                        name="enabled"
                        label="Actief"
                        value={data.enabled}
                        selectType="checkbox"
                    />

                    <InputElement
                        errors={errors}
                        register={register}
                        name="roomNumber"
                        label="Kamernummer"
                        inputType="text"
                        value={data.roomNumber}
                        validationRules={{
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="telPharmacy"
                        label="Telefoon apotheek"
                        inputType="text"
                        value={data.telPharmacy}
                        validationRules={{
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="telGeneralPractitioner"
                        label="Telefoon huisarts"
                        inputType="text"
                        value={data.telGeneralPractitioner}
                        validationRules={{
                        }}
                    />
                    <Button type="submit">
                        Voeg toe
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(ClientNewPage);