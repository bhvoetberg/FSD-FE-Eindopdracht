import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";

import './MedicinePage.css';

function MedicinePage(props) {

    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [medName, setMedName] = useState("");
    const dosageForms = {
        'label': ''
    }


    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/medicines/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            result = await result.data;
            setMedName(result.medName);
            setData(result);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div className="page-container">
            <h1 className="page-title">Medicijn</h1>
            <Link to={"./medicine-new"}>
                <button className="new">Nieuw</button>
            </Link>
            <div className="content">
                {data.map((item) =>
                    <>
                        <Link to={"medicine-update/" + item.id} className="item">
                            <p>{item.medName}</p>
                            <button className="update">Update</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default MedicinePage;