import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import './EmployeePage.css';
import axios from "axios";

function EmployeePage() {
    const [error, toggleError] = useState(false);
    const [id, setId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);
    const [name, setName] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function getEmployees() {
            toggleError(false);
            try {
                const result = await axios.get(`http://localhost:8080/employees/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(result.data);

            } catch (e) {
                toggleError(true);
                console.error(e);
            }
        }
        getEmployees();

    }, []);


    useEffect(() => {
        function searchEmployee() {
            console.log('search');

            let found = employees.filter((employee) => {
                return (employee.lastName.includes(name) || employee.firstName.includes(name)) ;
                }
            )
            console.log(found);
            setFilteredNames(found);
        }
        searchEmployee();
    }, [name]);

    useEffect( () => {

    },[filteredNames]);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]


    return (
        <section className="page-container">
            <h1 className="page-title">Medewerker</h1>
            <div className="employee-content">
                <form>
                    {/*<p className="retrieve-field">ipsum.</p>*/}
                    <label htmlFor="search">
                        <input
                            className="retrieve-field"
                            type="text"
                            id="search"
                            name="search"
                            // value={name}
                            placeholder="medewerkersnaam"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <Select options={options} />

                    <div className="retrieve-data">
                        {error && <p>Dit nummer is onbekend</p>}
                        {!error &&
                            <>
                                <p>Lorem@Consecteur.com</p>
                                <p>Ipsum</p>
                                <p>Dolor</p>
                                <p>Sit</p>
                            </>
                        }
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