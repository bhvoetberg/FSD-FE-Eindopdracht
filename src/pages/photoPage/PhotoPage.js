import React, {useEffect, useState} from "react";
import axios from "axios";


function PhotoPage() {
    const url = 'http://localhost:8080/clientphoto/3/photo';
    const token = localStorage.getItem('token');
    const [data, setData] = useState({
        description: null,
        base64: null
    })

    async function submit(data) {
        try {
            const result = await axios.put('http://localhost:8080/clientphoto/3/photo',
                data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const converted = await convertBase64(file);
        setData({
            description: "nog aanmaken in page",
            base64: converted
        })
        submit(data);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <>
            <input type="file" onChange={(e) => {
                uploadImage(e);
            }}/>
        </>
    );
}

export default PhotoPage;