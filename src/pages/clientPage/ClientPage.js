import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";

import './ClientPage.css';

function ClientPage() {

    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [clientName, setClientName] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/clients/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            result = await result.data;
            setClientName(result.clientName);
            setData(result);
        } catch (e) {
            console.error(e);
        }
    }


    return ({data} &&
        <div className="page-container">
            <h1 className="page-title">Client</h1>
            <Link to={"./client-new"}>
                <button className="new">Nieuw</button>
            </Link>
            <div className="content">
                {data.map((item) =>
                    <>
                        <Link to={"client-update/" + item.id} className="item">
                            <p>{item.firstName}</p>
                            <p>{item.lastName}</p>
                            <button className="update">Update</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default ClientPage;