import React, {useEffect, useState} from "react";
import axios from "axios";


function PhotoPage() {
    const url = 'http://localhost:8080/clientphoto/3/photo';
    const token = localStorage.getItem('token');
    let photo = {
        photo: null
    }

    async function submit(data) {
        try {
            console.log("foto post gestart, data is nu");
            console.log(data)
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
        console.log('Photo is nu:');
        console.log(photo);
        const file = e.target.files[0];
        const converted = await convertBase64(file);
        photo.photo = converted;
        console.log("stap 2")
        console.log(photo);
        submit(photo);
    }

    const convertBase64 = (file) => {
        console.log("stap 1");
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