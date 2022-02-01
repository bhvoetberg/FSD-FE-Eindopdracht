import React, {useState, useEffect} from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import './ClientUpdatePage.css'

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";


function ClientUpdatePage(props) {
    const token = localStorage.getItem('token');
    const [isChecked, setIsChecked] = useState(null);
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const photo = {
        photo: null
    }
    const history = useHistory();


    //Functionality for the client details.

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/clients/` + props.match.params.id, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            const received = await result.data;
            setData(received);
            setIsChecked(received.enabled);
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
            console.log(result);
            history.push('/client');
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //Functionality for the photo: change and delete

    const uploadImage = async (e) => {
        if (e.target.files.length === 1) {
            const file = e.target.files[0];
            photo.photo = await convertBase64(file);
            await submit(photo);
        }
        else{
            console.log("Geen file gekozen")
        }
    }

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

    async function submit(data) {
        try {
            const result = await axios.patch('http://localhost:8080/clients/' + props.match.params.id,
                data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            await getData();
        } catch (e) {
            console.log(e);
        }
    }

    async function deletePhoto() {
        try {
            const result = await axios.delete('http://localhost:8080/clients/' + props.match.params.id +'/photo',
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            await getData();
        } catch (e) {
            console.log(e);
        }
    }

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
                            <button onClick={deletePhoto}>Verwijder foto</button>
                            <label htmlFor="add-photo">Selecteer een file:
                                <input type="file"  name="add-photo" accept="image/*"
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

                    <div className="input-type">
                        <label htmlFor="enabled-field">
                            Actief
                        </label>
                        <input
                            type="checkbox"
                            checked={isChecked === true ? true : false}
                            onChange={(e) => {
                                setIsChecked(e.target.checked)
                            }}
                        />
                    </div>

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