import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import './EmployeePage.css';
import axios from "axios";
import {logDOM} from "@testing-library/react";

function EmployeePage() {
    const [error, toggleError] = useState(false);
    const [id, setId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [name, setName] = useState('');
    const token = localStorage.getItem('token');
    const [selectedValue, setSelectedValue] = useState(1);

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
            console.log(employees);

            let found = employees.filter((employee) => {
                return (employee.lastName.includes(name) || employee.firstName.includes(name)) ;
                }
            )
            console.log(found);
            setFilteredNames(found);
            const dropDownList = []
            for (let i = 0; i < found.length; i++ ) {
                let fullName = found[i].firstName + ' ' + found[i].lastName;
                let dropDownItem = {
                    label: fullName,
                    value: found[i].id
                }
                dropDownList.push(dropDownItem);
            }
            console.log(dropDownList);
            setOptionList(dropDownList);

        }
        searchEmployee();
    }, [name]);

    useEffect( () => {

    },[filteredNames]);


    const handleChange = e => {
        setSelectedValue(e.value);
    }


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

                    <Select
                        options={optionList}
                        value={selectedValue}
                        defaultMenuIsOpen="true"
                        onChange={handleChange}
                    />
                    <p>*** Selected Value</p>
                    <div>{selectedValue}</div>

                    <div className="retrieve-data">

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