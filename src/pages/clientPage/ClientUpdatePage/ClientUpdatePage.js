import React, {useState, useEffect} from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";


import '../ClientUpdatePage/ClientUpdatePage.css'

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";
import MultiSelectElement from "../../../components/multiSelectElement/MultiSelectElement";


function ClientUpdatePage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const [photo, setPhoto] = useState({
        description: null,
        base64: null
    })
    const history = useHistory();

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/clients/` + props.match.params.id, {
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
            const result = await axios.put('http://localhost:8080/clients/' + props.match.params.id, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            history.push('/client');
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    async function submit(data) {
        try {
            console.log("foto post gestart");
            const result = await axios.patch('http://localhost:8080/clients/3',
                data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const converted = await convertBase64(file);
        setPhoto({
            photo: converted
        })
        submit(photo);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">Client update</h1>
                <form className="content" name="client-input" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="photo">
                        {data.photo === null ? <p>Geen foto beschikbaar</p> :
                            <img src={data.photo} alt={`Foto van ${data.firstName} ${data.lastName} `}
                                 title={data.firstName}/>}
                        <div className="photo-buttons">
                            <button>Verwijder foto</button>
                            <label htmlFor="add-photo">Selecteer een file:
                                <input type="file" placeholder="Voeg foto toe ..." name="add-photo"
                                       onChange={(e) => {
                                           uploadImage(e);
                                       }}/>
                            </label>

                        </div>

                    </div>

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
                        validationRules={{}}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="telPharmacy"
                        label="Telefoon apotheek"
                        inputType="text"
                        value={data.telPharmacy}
                        validationRules={{}}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="telGeneralPractitioner"
                        label="Telefoon huisarts"
                        inputType="text"
                        value={data.telGeneralPractitioner}
                        validationRules={{}}
                    />

                    <Button type="submit">
                        Pas aan
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(ClientUpdatePage);