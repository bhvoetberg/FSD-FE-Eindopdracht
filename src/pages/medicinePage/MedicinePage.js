import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";
import arrayObjectKeySorter from '../../helpers/arrayObjectKeySorter'

import './MedicinePage.css';

function MedicinePage() {

    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);

    useEffect(() => {
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
            setData(arrayObjectKeySorter(received, 'medName'));
        } catch (e) {
            console.error(e);
        }
    }


    return ({data} &&
        <div className="page-container">
            <h1 className="page-title">Medicijn</h1>
            <Link to={"/medicine-new"}>
                <button className="new">Nieuw</button>
            </Link>
            <div className="content">
                {data.map((item) =>
                    <ul key={item.id}>
                        <Link to={"medicine-update/" + item.id} className="item">
                            <p>{item.medName}</p>
                            <button className="update">Pas aan</button>
                        </Link>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MedicinePage;