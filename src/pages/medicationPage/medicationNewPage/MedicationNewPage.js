import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import '../medicationNewPage/MedicationNewPage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";


function MedicationNewPage(props) {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [optionList, setOptionList] = useState([]);
    const [clientId, setClientId] = useState(null);
    const [medicineId, setMedicineId] = useState(null);
    const [newPlanningId, setNewPlanningId] = useState(null);
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });

    const history = useHistory();

    useEffect(() => {
        setClientId(props.match.params.id);
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/medicines/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            const received = await result.data;
            setData(received);
            setOptionList(makeOptionList(received));
        } catch (e) {
            console.error(e);
        }
    }

    function makeOptionList(data) {
        const optionList = [];
        for (let i = 0; i < data.length; i++) {
            optionList[i] = {
                value: data[i].id,
                label: data[i].medName
            }
        }
        return optionList;
    }

    async function onFormSubmit(formdata) {
        let data = {...formdata};
        data.enabled = isChecked;
        try {
            const result = await axios.post('http://localhost:8080/medicine/' + medicineId + '/planning', data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            setNewPlanningId(result.data);
            await addClientPlanning(clientId, result.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function addClientPlanning(clientId, newPlanningId) {
        try {
            const result = await axios.post('http://localhost:8080/clientplanning/' + clientId + '/' + newPlanningId, null ,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            history.push('/medication');

        } catch (e) {
            console.error(e);
        }
    }

    const handleChange = e => {
        setMedicineId(e.value);
        console.log(medicineId);
    }

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">Medicatie nieuw</h1>

                <form className="content" name="medicine-input" onSubmit={handleSubmit(onFormSubmit)}>

                    <div className="medicine-selection">
                        <p>Selecteer medicijn</p>
                        <Select
                            options={optionList}
                            onChange={handleChange}
                        />
                    </div>

                    <InputElement
                        errors={errors}
                        register={register}
                        name="quantity"
                        label="Hoeveelheid"
                        inputType="text"
                        value={data.quantity}
                        validationRules={{
                            required: "Hoeveelheid is verplicht",
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="planDate"
                        label="Datum"
                        inputType="text"
                        value={data.planDate}
                        validationRules={{
                            required: "Datum is verplicht",
                        }}
                    />

                    <InputElement
                        errors={errors}
                        register={register}
                        name="planTime"
                        label="Tijdstip"
                        inputType="text"
                        value={data.administerMethod}
                        validationRules={{
                            required: "Toedieningsvorm is verplicht",
                        }}
                    />

                    <div className="input-type">
                        <label htmlFor="enabled">
                            Actieve planning
                        </label>
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={isChecked}
                            onChange={(e) => {
                                setIsChecked(e.target.checked)
                            }}
                        />
                    </div>

                    <Button type="submit">
                        Voeg toe
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(MedicationNewPage);