import React, {useState, useEffect} from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import '../medicineUpdatePage/MedicineUpdatePage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";
import MultiSelectElement from "../../../components/multiSelectElement/MultiSelectElement";


function MedicineUpdatePage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/medicines/` + props.match.params.id, {
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
        console.log("Te posten data");
        console.log(data);
        try {
            const result = await axios.put('http://localhost:8080/medicines/' + props.match.params.id, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            history.push('/medicine');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className="page-container">
                <h1 className="page-title">Medicijn update</h1>
                <form className="content" name="client-input" onSubmit={handleSubmit(onFormSubmit)}>
                    <InputElement
                        errors={errors}
                        register={register}
                        name="medName"
                        label="Medicijnnaam"
                        inputType="text"
                        value={data.medName}
                        validationRules={{
                            required: "Medicijnnaam is verplicht",
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        name="dosageForm"
                        label="Vorm"
                        inputType="text"
                        value={data.dosageForm}
                        validationRules={{
                            required: "Vorm is verplicht",
                        }}
                    />

                    <InputElement
                        errors={errors}
                        register={register}
                        name="administerMethod"
                        label="Toedieningsvorm"
                        inputType="text"
                        value={data.administerMethod}
                        validationRules={{
                            required: "Toedieningsvorm is verplicht",
                        }}
                    />

                    <MultiSelectElement
                        errors={errors}
                        register={register}
                        name="perilous"
                        label="Risicovol"
                        value={data.perilous}
                        selectType="checkbox"
                    />

                    <InputElement
                        errors={errors}
                        register={register}
                        name="urlExternalInfo"
                        label="URL"
                        inputType="text"
                        value={data.urlExternalInfo}
                        validationRules={{
                        }}
                    />

                    <InputElement
                        errors={errors}
                        register={register}
                        name="instructions"
                        label="Instructies"
                        inputType="textarea"
                        value={data.instructions}
                        validationRules={{
                        }}
                    />
                    <p>{data.photo}</p>
                    <Button type="submit">
                        Update
                    </Button>

                </form>
            </div>

        </div>
    );
}

export default withRouter(MedicineUpdatePage);