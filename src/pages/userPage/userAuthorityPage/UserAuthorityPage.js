import React, {useState, useEffect} from "react";
import {Link, useHistory, withRouter} from 'react-router-dom';
import axios from "axios";
import {useForm} from "react-hook-form";


import '../userAuthorityPage/UserAuthorityPage.css';

import Button from "../../../components/button/Button"
import InputElement from "../../../components/inputElement/InputElement";


function UserAuthorityPage(props) {
    const token = localStorage.getItem('token');
    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: 'onChange',
    });
    const [data, setData] = useState([]);
    const [isChecked, setIsChecked] = useState(null);
    const history = useHistory();
    const url = 'http://localhost:8080/users/' + props.match.params.id + `/authorities`;


    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(data);
    },[isChecked]);

    async function getData() {
        console.log(url);
        try {
            const result = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            const received = await result.data;
            setData(received);
            setIsChecked(result.data.enabled);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    async function onFormSubmit(data) {
        try {
            const result = await axios.put(url,
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

    async function deleteAuthority() {
        try {
            const result = await axios.delete(`http://localhost:8080/users/multi_roles/authorities/ROLE_ADMIN`,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
            await getData();
        } catch (e) {
            console.log(e);
        }
    }

    return (
            <div className="page-container">
                <h1 className="page-title">Gebruiksrechten</h1>

                    <div className="content">
                        {data.map((item) =>
                            <ul key={item.id}>
                                    <p>{item.authority}</p>
                                    <button className="update">Aanpassen</button>
                            </ul>
                        )}
                    </div>
            </div>
    );
}

export default withRouter(UserAuthorityPage);