import React, {useEffect, useState} from "react";
import axios from "axios";


function PhotoPage() {
    const url = 'http://localhost:8080/clientphoto/3/photo';
    const token = localStorage.getItem('token');
    const [photo, setPhoto] = useState({
        description: null,
        base64: null
    })

    async function submit(data) {
        try {
            console.log("foto post gestart");
            const result = await axios.patch('http://localhost:8080/clients/3',
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
        setPhoto({
            photo: converted
        })
        submit(photo);
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