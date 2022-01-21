import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";
import arrayObjectKeySorter from '../../helpers/arrayObjectKeySorter'

import './UserPage.css';

function UserPage(props) {

    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/users/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            result = await result.data;
            console.log(result);
            setUsername(result.username);
            setData(arrayObjectKeySorter(result, 'username'));

        } catch (e) {
            console.error(e);
        }
    }


    return ({data} &&
        <div className="page-container">
            <h1 className="page-title">User</h1>
            <Link to={"./user-new"}>
                <button className="new">Nieuw</button>
            </Link>
            <div className="content">
                {data.map((item) =>
                    <>
                        <Link to={"user-update/" + item.username} className="item">
                            <p>{item.username}</p>
                            <button className="update">Update</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserPage;