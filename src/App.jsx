import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [voiceId, setVoiceId] = useState(''); // State to store the voice_id

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

        const formData = new FormData();
        formData.append("description", "For POC");
        formData.append("files", selectedFile, selectedFile.name); // Appending the selected file
        formData.append("name", "HD Voice");

        axios.post("https://api.elevenlabs.io/v1/voices/add", formData, {
            headers: {
                'xi-api-key': 'something',
            }
        })
        .then(response => {
            console.log('Success:', response.data);
            // Update the voiceId state with the response
            setVoiceId(response.data.voice_id);
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
                <input type="file" onChange={onFileChange} accept=".mp3,.wav,.aac,.flac,.ogg,.aiff,.m4a,.wma" />
                <button onClick={onFileUpload}>Upload!</button>
            </div>
            {fileData()}
            {voiceId && (
                <div>
                    <h2>Response:</h2>
                    <p>voice_id: {voiceId}</p>
                </div>
            )}
        </div>
    );
}

export default App;
