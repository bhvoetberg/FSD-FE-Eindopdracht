import React, {useState, useEffect} from 'react';
import './EmployeePage.css';
import axios from "axios";

function EmployeePage() {
    const [error, toggleError] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function handleRetrieveEmployee(name, e) {
            // e.preventDefault();
            toggleError(false);

            try {
                const result = await axios.get(`http://localhost:8080/employees/${name}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('------');
                console.log(result);
                console.log('------');


            } catch (e) {
                toggleError(true);
                console.error(e);
            }
        }
    }, []);


    return (
        <section className="page-container">
            <h1 className="page-title">Medewerker</h1>
            <div className="employee-content">
                <form>
                    <p className="retrieve-field">ipsum.</p>
                    <div className="retrieve-data">
                        <p>Lorem@Consecteur.com</p>
                        <p>Ipsum</p>
                        <p>Dolor</p>
                        <p>Sit</p>
                    </div>
                </form>

                <form>
                    <p className="update-button">Lorem ipsum.</p>
                    <div className="update-data">
                        <p>Lorem@Consecteur.com</p>
                        <p>Ipsum</p>
                        <p>Dolor</p>
                        <p>Sit</p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default EmployeePage;