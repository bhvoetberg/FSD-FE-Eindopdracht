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
    const [pending, togglePending] = useState(true);
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

    console.log("Data na use-effect")
    console.log(data);


    async function onFormSubmit(data) {
        console.log("Te posten data");
        console.log(data);
        try {
            const result = await axios.put('http://localhost:8080/planning/' + props.match.params.id, data,
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


    return (
        <div>
            {data && <>
                {data.client.firstName}
                <div className="page-container">
                    <h1 className="page-title">Uitvoering</h1>
                    <form className="content" name="realisation-input" onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="client-info">
                            <p>{data.client.firstName} {data.client.lastName}</p>
                            <p>{data.planDate} - {data.planTime}</p>


                        <h4>Geboren: </h4>{data.client.dateOfBirth}
                        <h4>Kamer: </h4>{data.client.roomNumber}
                        <br/>
                        <h4>Tel. apotheek: </h4>{data.client.telPharmacy}
                        <h4>Tel. arts: </h4>{data.client.telGeneralPractitioner}
                        <img src={data.client.photo} alt={`Foto van ${data.client.firstName} ${data.client.lastName} `}
                             title={data.client.firstName}/>
                        </div>
                        <div className="medication-info">
                            <h4>{data.medicine.medName}</h4>

                            {data.medicine.perilous ?
                                <h4>Risicovolle medicatie</h4>
                                :
                                <h4>Geen risicovolle medicatie</h4>
                            }
                            <h4>{data.medicine.dosageForm}</h4>
                            <h4>{data.medicine.administerMethod}</h4>
                            <h4>{data.medicine.instructions}</h4>




                        </div>




                        <Button type="submit">
                                 Update
                        </Button>

                    </form>
                </div>
            </>
            }
        </div>
    );
}

export default withRouter(RealisationPage);