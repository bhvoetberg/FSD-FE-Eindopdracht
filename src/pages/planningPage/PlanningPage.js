import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";
import MultiSelectElement from "../../components/multiSelectElement/MultiSelectElement";

import './PlanningPage.css';

import {useForm} from "react-hook-form";
import arrayDateSorter from "../../helpers/arrayDateSorter";

function PlanningPage() {

    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const {register, formState: {errors}} = useForm({
        mode: 'onChange',
    });

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAll]);


    async function getData() {
        try {
            let result = await axios.get(`http://localhost:8080/planning/`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            result = await result.data;

            if (showAll) {
                const sorted = arrayDateSorter(result, 'planDate');
                setData(sorted);
            } else {
                const filteredResult = result.filter(item => item.enabled === true);
                setData(arrayDateSorter(filteredResult, 'planDate'));
            }

        } catch (e) {
            console.error(e);
        }
    }

    function updateForm(e) {
        if (e.target.value === "true") {
            setShowAll(false)
        }
        if (e.target.value === "false") {
            setShowAll(true)
        }
    }

    return ({data} && <div className="page-container">
        <h1 className="page-title">Planning</h1>

        <Link to={"./planning-new"}>
            <button className="new">Nieuw</button>
        </Link>
        <div className="filter" onChange={((e) => updateForm(e))}>
            <MultiSelectElement
                errors={errors}
                register={register}
                name="filter"
                label="Exclusief voltooid"
                value="true"
                selectType="radio"
                labelId="inclusive"
            />
            <MultiSelectElement
                errors={errors}
                register={register}
                name="filter"
                value="false"
                label="Inclusief voltooid"
                selectType="radio"
            />
        </div>

        <div className="content">
            {data.map((item) => <ul key={item.id}>
                <Link to={"realisation/" + item.id} className="item">
                    {item.enabled === true ? <>
                        <p className="active">{item.planDate} - {item.planTime} - {item.client.firstName} {item.client.lastName} -
                            kamer {item.client.roomNumber}</p>
                        <label className="active"></label>
                        <button>Starten</button>
                    </> : <>
                        <p className="inactive">{item.planDate} - {item.planTime} - {item.client.firstName} {item.client.lastName} -
                            kamer {item.client.roomNumber}  </p>
                        <label className="inactive"></label>
                        <button className="inactive">Historie</button>
                    </>}
                </Link>
            </ul>)}
        </div>
    </div>);
}

export default PlanningPage;
