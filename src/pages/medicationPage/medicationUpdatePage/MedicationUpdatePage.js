import React, {useState, useEffect} from "react";
import {withRouter, Link} from 'react-router-dom';
import axios from "axios";

import '../medicationUpdatePage/MedicationUpdatePage.css';
import MedicationNewPage from "../medicationNewPage/MedicationNewPage";

import arrayDateSorter from "../../../helpers/arrayDateSorter";


function MedicationUpdatePage(props) {
    const token = localStorage.getItem('token');
    const [data, setData] = useState({});
    const [planning, setPlanning] = useState([]);
    const [plannedMedicationAvailable, setPlannedMedicationAvailable] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [isChecked, setIsChecked] = useState(null);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/clients/` + props.match.params.id, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            setData(result.data);
            setClientId(props.match.params.id);
            setPlanning(arrayDateSorter(result.data.plannings, "planDate"));

            if (result.data.plannings.length > 0) {
                setPlannedMedicationAvailable(true);
            }

        } catch (e) {
            console.error(e);
        }
    }

    async function onFormSubmit(formdata) {
        let data = {...formdata};
        data.enabled = isChecked;
        try {
            const result = await axios.patch('http://localhost:8080/planning/' + props.match.params.id, data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }


    return ({plannedMedicationAvailable} &&
        <div className="page-container">

            {<MedicationNewPage clientId={clientId}/>}

            <h1 className="page-title">Medicatie-overzicht</h1>

            <div className="content">
                {planning.map((item) =>
                    <ul key={item.id}>
                        <Link to={"medication-update-details/" + item.id} className="item">
                            <p>{item.planDate}</p>
                            <p>{item.planTime}</p>
                            <p>{item.medicine.medName}</p>
                            <button className="update">Aanpassen</button>
                        </Link>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default withRouter(MedicationUpdatePage);