import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import '../realisationPage/RealisationPage.css';

import Button from '../../components/button/Button'
import MultiSelectElement from "../../components/multiSelectElement/MultiSelectElement";


function RealisationPage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function getData() {
            try {
                let result = await axios.get(`http://localhost:8080/planning/` + props.match.params.id, {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    },
                });
                const received = result.data;
                setData(received);
                console.log("Data");
                console.log(data);
            } catch (e) {
                console.error(e);
            }
        }

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function onFormSubmit(data) {
        console.log("Te posten data");
        console.log(data);
        try {
            const result = await axios.patch('http://localhost:8080/planning/' + props.match.params.id, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            // history.push('/planning');
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div>
            {data &&
                <>
                    <div className="page-container">
                        <h1 className="page-title">Uitvoering</h1>

                        <div className="client-info">
                            <div className="client-info-left">
                                <p>{data.client.firstName} {data.client.lastName}</p>
                                <p>{data.planDate} - {data.planTime}</p>
                            </div>
                            <div className="client-info-middle-field-names">
                                <text>Geboren:</text>
                                <text>Kamer:</text>
                                <br/>
                                <text>Tel. apotheek:</text>
                                <text>Tel. arts:</text>
                            </div>
                            <div className="client-info-middle-field-data">
                                <text>{data.client.dateOfBirth}</text>
                                <text>{data.client.roomNumber}</text>
                                <br/>
                                <text>{data.client.telPharmacy}</text>
                                <text>{data.client.telGeneralPractitioner}</text>
                            </div>
                            <div className="client-info-right">
                                <img src={data.client.photo}
                                     alt={`Foto van ${data.client.firstName} ${data.client.lastName} `}
                                     title={data.client.firstName}/>
                            </div>
                        </div>

                        <div className="medication">
                            <div className="medication-info">
                                <div className="medication-info-left">
                                    <strong><a href={data.medicine.urlExternalInfo} target="_blank"
                                               className="medicine-name">{data.quantity} stuks {data.medicine.medName}</a></strong>
                                    <text>Vorm: {data.medicine.dosageForm}</text>
                                    <text>Inname: {data.medicine.administerMethod}</text>
                                    <text>Frequentie: {data.medicine.frequency}</text>
                                </div>
                                <div className="medication-info-right">
                                    {data.medicine.perilous ?
                                        <text className="perilous"><strong>Risicovolle medicatie</strong></text>
                                    :
                                        <text>Geen risicovolle medicatie</text>
                                    }
                                    <text className="instructions">
                                        <strong>Instructies: </strong>{data.medicine.instructions}
                                    </text>

                                </div>
                            </div>

                            <form className="form-content" name="realisation-input"
                                  onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="execution">
                                    <div className="form-radio">
                                        <MultiSelectElement
                                            errors={errors}
                                            register={register}
                                            name="execution"
                                            label="Aangereikt"
                                            selectType="radio"
                                        />
                                        <MultiSelectElement
                                            errors={errors}
                                            register={register}
                                            name="execution"
                                            label="Toegediend"
                                            selectType="radio"
                                        />
                                        <MultiSelectElement
                                            errors={errors}
                                            register={register}
                                            name="execution"
                                            label="Klaargezet"
                                            selectType="radio"
                                        />
                                    </div>

                                </div>
                                <div className="finish">
                                    <div className="form-right">
                                        <p><em>Reg. afwijking (niet functioneel)</em> </p>
                                    </div>
                                    <Button type="submit">
                                        Meld gereed
                                    </Button>
                                </div>

                            </form>

                        </div>

                    </div>
                </>
            }
        </div>
    );
}

export default withRouter(RealisationPage);