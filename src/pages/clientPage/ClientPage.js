import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import SingleSelectElement from "../../components/singleSelectElement/SingleSelectElement";
import Button from "../../components/button/Button";
import InputElement from "../../components/InputElement/InputElement";


function ClientPage() {

    const token = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [clients, setClients] = useState([]);
    const [updated, toggleUpdated] = useState(false);
    const {handleSubmit, register, formState: {errors}, watch, reset} = useForm({
        mode: 'onChange'
    });

    const [firstName, setFirstName] = useState('');
    //
    // useEffect(() => {
    //     setID(localStorage.getItem('ID'))
    //     setFirstName(localStorage.getItem('First Name'));
    // },[]);


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

    const recordId = watch("selected-client");

    // useEffect(() => {
    //     if (recordId > 0) {
    //         setFirstName(clients[recordId].firstName);
    //         console.log("Firstname na change");
    //         console.log(firstName);
    //     }
    // }, [recordId])


    function onFormSubmit(data) {
        console.log(data);
    }

    useEffect(() => {
        getClients();
    }, [updated]);

    console.log(clients, recordId);

    return (
        <div>
            <form name="client-input" onSubmit={handleSubmit(onFormSubmit)}>
                <SingleSelectElement
                    errors={errors}
                    register={register}
                    name="selected-client"
                    label="Kies client"
                >
                    {clients.map((option, i) => {
                        return (<option key={option.id} value={i}>{option.firstName} {option.lastName}</option>);
                    })}
                </SingleSelectElement>

                <p>Local storage</p>
                {localStorage.getItem('error')}


                {recordId &&
                    <>
                        {<p>Record ID</p>}
                        {recordId}

                        <InputElement
                            errors={errors}
                            register={register}
                            name="firstName"
                            value={clients[recordId].firstName}
                            placeholder="Voornaam"
                            inputType="text"
                            validationRules={{
                                required: "Voornaam is verplicht"
                            }}
                        />
                    </>}


                <Button type="submit">
                    Update
                </Button>
            </form>
        </div>
    );
}

export default ClientPage;