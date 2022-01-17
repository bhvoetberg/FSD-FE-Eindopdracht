// import React, {useState, useEffect} from 'react';
// import AsyncSelect from "react-select/async";
// import {useForm} from "react-hook-form";
// import axios from "axios";
//
// import './EmployeePage.css';
//
// import InputElement from "../../components/inputElement/InputElement";
// import {Link} from "react-router-dom";
//
//
// function EmployeePage() {
//     const {register, handleSubmit, formState: {errors}} = useForm();
//
//     const [error, toggleError] = useState(false);
//     const [employeeId, setEmployeeId] = useState('');
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [updated, toggleUpdated] = useState(false);
//     const [inputValue, setInputValue] = useState('');
//     const [selectedValue, setSelectedValue] = useState(null);
//
//     // const selectStyles = selectStyles();
//     const token = localStorage.getItem('token');
//     const dropDownList = [];
//
//     const handleInputChange = value => {
//         setInputValue(value);
//     }
//
//     const handleChange = value => {
//         setSelectedValue(value);
//     }
//
//     // async function onFormSubmit(data) {
//     //     toggleError(false);
//     //     toggleUpdated(false);
//     //     try {
//     //         const result = await axios.post('http://localhost:8080/employees', data,
//     //             {
//     //                 headers: {
//     //                     "Content-Type": "application/json", Authorization: `Bearer ${token}`,
//     //                 }
//     //             });
//     //         console.log("RESULTAAT POST");
//     //         console.log(result);
//     //         toggleUpdated(true);
//     //     } catch (e) {
//     //         console.error(e);
//     //         toggleError(true);
//     //     }
//     // }
//
//     // async function getEmployees() {
//     //     toggleError(false);
//     //     try {
//     //         const result = await axios.get(`http://localhost:8080/employees/`, {
//     //             headers: {
//     //                 "Content-Type": "application/json", Authorization: `Bearer ${token}`,
//     //             },
//     //         });
//     //         result = await result.data;
//     //         setEmployees(result.data);
//     //     } catch (e) {
//     //         toggleError(true);
//     //         console.error(e);
//     //     }
//     // }
//
//
//     async function getData() {
//         try {
//             let result = await axios.get(`http://localhost:8080/employees/`, {
//                 headers: {
//                     "Content-Type": "application/json", Authorization: `Bearer ${token}`,
//                 },
//             });
//             result = await result.data;
//             // setMedName(result.medName);
//             console.log("GETDATA AANGEROEPEN")
//             setData(result);
//             console.log(result);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     useEffect(() => {
//         getData();
//         console.log("Useeffect aangeroepen")
//     }, []);
//
//
//     return (
//         <section className="page-container">
//             {/*ERROR NOG INBOUWEN + CONTROLE OP DATA*/}
//             <h1 className="page-title">Medewerker</h1>
//             {/*{loading && <>*/}
//             <div className="employee-content">
//                 <div>
//                     {/*<p>Employee ID</p>*/}
//                     {/*{employeeId}*/}
//                     <p>Selected value: {selectedValue ? "a" : "b"}</p>
//                     <AsyncSelect
//                         cacheOptions
//                         defaultOptions
//                         value={employeeId}
//                         getOptionLabel={(e => e.firstName)}
//                         loadOptions={getData}
//                         onInputChange={handleInputChange}
//                         onChange={handleChange}
//                     />
//                     {/*<div className="retrieve-data">*/}
//                     {/*    {employeeId &&*/}
//                     {/*        <>*/}
//                     {/*<div>{employees[dropDownRecord].firstName}</div>*/}
//                     {/*<div>{employees[dropDownRecord].lastName}</div>*/}
//                     {/*<div>{employees[dropDownRecord].functionName}</div>*/}
//                     {/*<div>{employees[dropDownRecord].id}</div>*/}
//                     {/*<div>{employees[dropDownRecord].enabled.toString()}</div>*/}
//
//                     {/*            </>*/}
//                     {/*        }*/}
//                     {/*    </div>*/}
//                 </div>
//
//                 {/*<Link to={"employee-update/" + [employeeId].id}>*/}
//                 {/*    <button className="update">Update</button>*/}
//                 {/*</Link>*/}
//             </div>
//             {/*</>}*/}
//         </section>
//     );
// }
//
// export default EmployeePage;