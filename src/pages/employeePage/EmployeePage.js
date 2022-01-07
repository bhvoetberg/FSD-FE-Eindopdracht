import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import './EmployeePage.css';
import axios from "axios";

function EmployeePage() {
    const token = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [id, setId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEmployees();
    }, [loading]);


    const handleChange = e => {
        // setSelectedValue(e.value);
        setId(e.value);
    }

    async function getEmployees() {
        toggleError(false);
        try {
            const result = await axios.get(`http://localhost:8080/employees/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });

            if (result.data && result.data.length > 0) {
                setEmployees(result.data);
            }

            setLoading(true);

            const dropDownList = [];
            for (let i = 0; i < employees.length; i++) {
                let fullName = employees[i].firstName + ' ' + employees[i].lastName;
                let dropDownItem = {
                    label: fullName,
                    value: i
                }
                dropDownList.push(dropDownItem);
                setOptionList(dropDownList);
            }

        } catch (e) {
            toggleError(true);
            console.error(e);
        }

        console.log('EMPLOYEES');
        console.log(employees);
        console.log('OPTIONLIST');
        console.log(optionList);
    }


    return (
        <>
            <section className="page-container">
                {loading && <p>Loading = true</p>}
                {optionList && <p>Option list = true</p>}
                {employees && <p>Employees = true</p>}

                {/*ERROR NOG INBOUWEN + CONTROLE OP DATA*/}
                <h1 className="page-title">Medewerker</h1>
                {loading && <>
                    <div className="employee-content">
                        <form>
                            <Select
                                options={optionList}
                                value={id}
                                defaultMenuIsOpen="true"
                                onChange={handleChange}
                            />
                            <p>*** Selected Value</p>
                            <div>{id}</div>

                            <div className="retrieve-data">
                                    {id &&
                                        <>
                                            <div>{employees[id].firstName}</div>
                                            <div>{employees[id].lastName}</div>
                                            <div>{employees[id].functionName}</div>
                                            <div>{employees[id].id}</div>
                                            <div>{employees[id].enabled}</div>

                                        </>
                                    }
                            </div>
                        </form>

                        <form>
                            <p className="update-button">Lorem ipsum.</p>
                            <div className="update-data">
                                <p>Lorem</p>
                                <p>Ipsum</p>
                                <p>Dolor</p>
                                <p>Sit</p>
                            </div>
                        </form>
                    </div>
                </>}
            </section>

        </>)
        ;
}

export default EmployeePage;