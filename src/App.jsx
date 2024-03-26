import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [photoId, setPhotoId] = useState(''); // Updated state to store the photo_id

    const onFileChange = event => {
        const file = event.target.files[0];
        if (file && file.size > 50 * 1024 * 1024) { // Check for 50MB
            alert("File size cannot exceed 50MB");
        } else {
            setSelectedFile(file);
        }
    };

    const onFileUpload = () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const config = {
            headers: {
                'x-api-key': 'your-api-key', // Replace 'your-api-key' with your actual API key
                'Content-Type': 'image/jpeg',
            },
        };

        axios.post("https://upload.heygen.com/v1/talking_photo", selectedFile, config)
        .then(response => {
            console.log('Success:', response.data);
            // Update the photoId state with the response
            setPhotoId(response.data.data.talking_photo_id);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    };

    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose a file before pressing the Upload button</h4>
                </div>
            );
        }
    };

    return (
        <div>
            <h1>Upload your file here</h1>
            <div>
                <input type="file" onChange={onFileChange} accept=".jpg,.jpeg" />
                <button onClick={onFileUpload}>Upload!</button>
            </div>
            {fileData()}
            {photoId && (
                <div>
                    <h2>Response:</h2>
                    <p>photo_id: {photoId}</p>
                </div>
            )}
        </div>
    );
}

export default App;
