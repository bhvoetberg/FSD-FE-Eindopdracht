import React, {useState, useEffect} from "react";
import {useHistory, withRouter} from 'react-router-dom';
import axios from "axios";
import {useForm} from "react-hook-form";

import '../medicationUpdateDetailsPage/MedicationUpdateDetailsPage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";

function MedicationUpdateDetailsPage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const [isChecked, setIsChecked] = useState(null);
    const history = useHistory();

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/planning/` + props.match.params.id, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            const received = await result.data;
            setData(received);
            setIsChecked(received.enabled);
            console.log("Get")
            console.log(received)
            console.log(received);
        } catch (e) {
            console.error(e);
        }
    }

    async function onFormSubmit(data) {
        console.log("Te posten");
        console.log(data);
        try {
            const result = await axios.patch('http://localhost:8080/planning/' + props.match.params.id, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            history.push('/medication');
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">Medicatie update</h1>
                <form className="content" name="medication-input"
                      onSubmit={handleSubmit(onFormSubmit)}>
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
                        value={data.planTime}
                        validationRules={{
                            required: "Tijdstip is verplicht",
                        }}
                    />

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

                    <div className="input-type">
                        <label htmlFor="enabled-field">
                            Actieve planning
                        </label>
                        <input
                            type="checkbox"
                            checked={isChecked === true ? true : false}
                            onChange={(e) => {
                                setIsChecked(e.target.checked)
                            }}
                        />
                    </div>

                    <Button type="submit">
                        Pas aan
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(MedicationUpdateDetailsPage);