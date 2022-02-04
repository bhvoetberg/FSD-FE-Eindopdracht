import React, {useState, useEffect} from "react";
import {withRouter, Link} from 'react-router-dom';
import axios from "axios";

import '../medicationUpdatePage/MedicationUpdatePage.css';

function MedicationUpdatePage(props) {
    const token = localStorage.getItem('token');
    const [data, setData] = useState({});
    const [planning, setPlanning] = useState([]);
    const [plannedMedicationAvailable, setPlannedMedicationAvailable] = useState(false);

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
            setPlanning(result.data.plannings);
            if (result.data.plannings.length > 0) {
                setPlannedMedicationAvailable(true);
            }
            // console.log(result.data.plannings[0].planTime);
        } catch (e) {
            console.error(e);
        }
    }


    return ({plannedMedicationAvailable} &&
        <div className="page-container">
            <h1 className="page-title">Medicatie overzicht</h1>
            <div className="client">
                <p>{data.firstName}</p>
                <p>{data.lastName}</p>
            </div>

            <Link to={"./medication-new"}>
                <button className="new">Nieuw</button>
            </Link>
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