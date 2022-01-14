import React, {useEffect, useState} from "react";
import axios from "axios";

function PhotoPage() {

    const [postImage, setPostImage] = useState({
        myFile: "",
    });

    const url = 'http://localhost:8080/clientphoto/3/photo';
    const token = localStorage.getItem('token');
    const data = {
        description: 'Login foto',
        base64: 'test'
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

    useEffect(() => {
        console.log("Hallo")
        submit(data);
    }, []);



    // console.log(token);
    // const createImage = (newImage) => axios.post(url, newImage, {
    //     headers: {
    //         "Content-Type": "application/json", Authorization: `Bearer ${token}`,
    //     });
    //
    // const createPost = async (post) => {
    //     try {
    //         await createImage(post);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };
    //
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     createPost(postImage);
    // };
    //
    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //             console.log(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };
    // const handleFileUpload = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertToBase64(file);
    //     setPostImage({...postImage, myFile: base64});
    // };


    return (
        <>
            <div>
                <form onSubmit={submit(data)}>
                    <input
                        type="file"
                        name="myFile"
                        accept=".jpeg, .png, .jpg"
                        // onChange={(e) => handleFileUpload(e)}
                        // onChange={(e) => submit(data)}
                    />
                    <button>Submit</button>
                </form>
            </div>


        </>
    );
}

    export default PhotoPage;