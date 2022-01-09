import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import './EmployeePage.css';
import '../../components/InputElement/InputElement'
import axios from "axios";
import InputElement from "../../components/InputElement/InputElement";
import selectStyles from "../../helpers/selectStyles";


function EmployeePage() {
    const token = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [id, setId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const selectedStyles = selectStyles();


    useEffect(() => {
        getEmployees();
    }, [loading]);


    const handleChange = e => {
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
            }
            setOptionList(dropDownList);

        } catch (e) {
            toggleError(true);
            console.error(e);
        }
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
                                styles={selectedStyles}
                                value={id}
                                defaultMenuIsOpen="false"
                                onChange={handleChange}
                                placeholder="Kies uit de lijst ..."
                                id="select"
                            />
                            <div className="retrieve-data">
                                {id &&
                                    <>
                                        <div>{employees[id].firstName}</div>
                                        <div>{employees[id].lastName}</div>
                                        <div>{employees[id].functionName}</div>
                                        <div>{employees[id].enabled.toString()}</div>
                                    </>
                                }
                            </div>
                        </form>

                        <form>
                            <InputElement type="button" name="update" placeholder="update" id="update"/>
                            <div className="update-data">
                                <InputElement type="text" name="firstname" placeholder="Voornaam" id="firstname"/>
                                <InputElement type="text" name="lastname" placeholder="Achternaam" id="lastname"/>
                                <InputElement type="text" name="function" placeholder="Functie" id="function"/>
                                <div className="radio">
                                    <InputElement type="radio" name="enabled" display="Actief" id="true"
                                                  checked="checked"/>
                                    <InputElement type="radio" name="enabled" display="Inactief" id="false "/>
                                </div>
                            </div>
                            <button type="submit">
                                Verzenden
                            </button>
                        </form>
                    </div>
                </>}
            </section>

        </>)
        ;
}

export default EmployeePage;