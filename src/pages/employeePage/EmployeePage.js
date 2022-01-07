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

    //Voor react-select opmaak
    // const customStyles = {
    //     control: (base, state) => ({
    //         ...base,
    //         color: "var(--primary-color)",
    //         background: "white",
    //         borderRadius: state.isFocused ? "2rem" : "2rem",
    //         borderColor: state.isFocused ? "var(--primary-color)" : "var(--primary-color)",
    //         // boxShadow: state.isFocused ? null : null,
    //         "&:hover": {
    //             borderColor: state.isFocused ? "var(--primary-color)" : "var(--primary-color)"
    //         }
    //     }),
    //     menu: (base) => ({
    //         ...base,
    //         borderRadius: 0,
    //         marginTop: 0
    //     }),
    //     menuList: (base) => ({
    //         ...base,
    //         padding: 0
    //     })
    // };



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
                {/*ERROR NOG INBOUWEN + CONTROLE OP DATA*/}
                <h1 className="page-title">Medewerker</h1>
                {loading && <>
                    <div className="employee-content">
                        <form>
                            <Select
                                options={optionList}
                                // styles={customStyles}
                                value={id}
                                defaultMenuIsOpen="true"
                                onChange={handleChange}
                            />

                            <div className="retrieve-data">
                                    {id &&
                                        <>
                                            <div>{employees[id].firstName}</div>
                                            <div>{employees[id].lastName}</div>
                                            <div>{employees[id].functionName}</div>
                                            <div>{employees[id].id}</div>
                                            <div>{employees[id].enabled.toString()}</div>

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