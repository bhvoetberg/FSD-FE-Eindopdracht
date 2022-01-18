import React, {useEffect, useState} from "react";
import axios from "axios";


function PhotoPage() {
    const url = 'http://localhost:8080/clientphoto/3/photo';
    const token = localStorage.getItem('token');


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64);
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


    async function submit(data) {
        console.log('DATA');
        console.log(data);
        try {
            const result = await axios.post('http://localhost:8080/clientphoto/3/photo',
                data,
                {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    }
                });
        } catch (e) {
            console.log('Iets');
        }
    }


    return (
        <>
            <input type="file" onChange={(e) => {
                uploadImage(e);
            }}/>
        </>
    );
}

export default PhotoPage;