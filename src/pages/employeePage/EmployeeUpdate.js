import React, {useState, useEffect} from "react";
import {withRouter} from 'react-router-dom'
import axios from "axios";

function EmployeeUpdatePage(props) {
    const token = localStorage.getItem('token');
    const [data, setData]=useState([]);
    console.log("Props", props.match.params.id);


    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/employees/`+props.match.params.id, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            result = await result.data;
            setData(result);
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    function update() {

    }

    return (
        <div>
            <div className="page-container">
                <h1>Employee update</h1>
                <input type="text" defaultValue={data.firstName} />Naam
                <input type="text" defaultValue={data.lastName} />
                <input type="text" defaultValue={data.function} />
                {/*<input type="text" defaultValue={data.instructions} />*/}
                <button onClick={update}>Update</button>
            </div>

        </div>
    );
}

export default withRouter(EmployeeUpdatePage);