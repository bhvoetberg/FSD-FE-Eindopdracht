import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {set, useForm} from 'react-hook-form';
import axios from "axios";
import InputElement from "../../components/InputElement/InputElement";
import selectStyles from "../../helpers/selectStyles";


function ClientPage() {
    const { register, handleSubmit } = useForm();

    const [error, toggleError] = useState(false);
    const [id, setId] = useState('');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    const selectedStyles = selectStyles();
    const token = localStorage.getItem('token');
    const dropDownList = [];


    function onFormSubmit(data) {
        console.log(data);
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
    }, []);


    //useState is asynchronous. Resultingly, setClients will not make clients
    //immediately available. Making a dropdownlist, now start once clients is 'effected'.
    useEffect(() => {
        for (let i = 0; i < clients.length; i++) {
            let fullName = clients[i].firstName + ' ' + clients[i].lastName;
            let dropDownItem = {
                label: fullName,
                value: i
            }
            dropDownList.push(dropDownItem);
        }
    }, [clients]);

    return (
        <div className="page-container">
            <h1 className="page-title">Client</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Select
                    options={dropDownList}
                    styles={selectedStyles}
                    value={id}
                    defaultMenuIsOpen="false"
                    placeholder="Kies uit de lijst ..."
                    id="select"
                />
            <fieldset>
                    <legend>Gegevens</legend>
                    <label htmlFor="details-name">
                        Naam:
                        <input
                            type="text"
                            id="details-name"
                            {...register("name")}
                        />
                    </label>

                    <label htmlFor="details-age">
                        Leeftijd:
                        <input
                            type="number"
                            id="details-age"
                            {...register("age")}
                        />
                    </label>
                </fieldset>

                <fieldset>
                    <legend>Jouw review</legend>

                    <label htmlFor="recipe-comments">
                        Opmerkingen:
                        <textarea
                            {...register("comments")}
                            id="recipe-comments"
                            rows="4"
                            cols="40"
                            placeholder="Wat vond je van het recept?"
                        >
          </textarea>
                    </label>

                    <label htmlFor="recipe-newsletter">
                        <input
                            type="checkbox"
                            {...register("newsletter")}
                        />
                        Ik schrijf me in voor de nieuwsbrief
                    </label>

                    <button type="submit">
                        Versturen
                    </button>
                </fieldset>
            </form>

        </div>
    );
}

export default ClientPage;