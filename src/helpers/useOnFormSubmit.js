import React, {useEffect, useState} from 'react';
import axios from "axios";

async function useOnFormSubmit(data, endPoint) {

    const token = localStorage.getItem('token');
    const [error, toggleError] = useState(false);

    console.log("SUBMITTED DATA")
    console.log(data);
    toggleError(false);

    try {
        console.log("In data zit:");
        console.log(data);
        const result = await axios.post(endPoint, data,
            {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                }
            });
        console.log("RESULTAAT POST");
        console.log(result);

    } catch(e) {
        console.error(e);
        toggleError(true);
    }
}

export default useOnFormSubmit;