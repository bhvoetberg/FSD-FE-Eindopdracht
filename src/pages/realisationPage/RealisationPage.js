import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";

import '../realisationPage/RealisationPage.css';

function RealisationPage(props) {
    const token = localStorage.getItem('token');
    const {handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState('');
    const history = useHistory();

    async function onFormSubmit() {
        let data = {
            enabled: 'false'
        };

        try {
            const result = await axios.patch('http://localhost:8080/planning/' + props.match.params.id,
                data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            history.push('/planning');
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

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

            } catch (e) {
                console.error(e);
            }
        }

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                                    <strong><a href={data.medicine.urlExternalInfo} target="_blank" rel="noreferrer noopener"
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

                            {data.enabled
                                ?
                                <form onSubmit={handleSubmit(onFormSubmit)}>
                                    <button type="submit">Meld gereed</button>
                                </form>
                                :
                                <p>Historie</p>
                            }

                        </div>

                    </div>
                </>
            }
        </div>
    );
}

export default withRouter(RealisationPage);