import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showVideo, setShowVideo] = useState(false); 
    
    const videoUrl = 'https://files.heygen.ai/aws_pacific/avatar_tmp/cb0e683949aa4e3fa2df4c97cc7ce91a/d89350cdd7434e619d98e155269f4f06.mp4?Expires=1712250871&Signature=MiKGlaaVmUGnqRuGiqNZc3Hfbx~BXTfOrHYACc-CIBEkRPGAeT5RRfbX4tiHGqCgnXrFOTwwZku73svIiL~M6oIc5CZdmdQjiImoSKpSnj6WF3fmY25tXygthCIp8fq3HpzYNW0B4m49MFwEPevPhS3F6YMytLaAlmQGdgzo-dCumWWHBvx3uVafkOcaPIr8~6ycBQF11BT3Xc6Ns-T~qKiTL5CiRuDWk5Q-nBeRRJRqCpKsE2Z0hkEzjDJ1iPncQuw~UB5csVL89LNepMi0TzEtfYhDuTCHXQvrndznVc~07VUQPIysR7rv-qPlV3ZWOCIchQnEqgT5~u8hHuoCBA__&Key-Pair-Id=K49TZTO9GZI6K';

    const onFileChange = event => {
        const file = event.target.files[0];
        if (file && file.size > 50 * 1024 * 1024) { 
            alert("File size cannot exceed more than 50MB");
        } else {
            setSelectedFile(file);
            setShowVideo(false); 
        }
    };

    const handleVideo = () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        // Show the video and download link when the button is clicked
        setShowVideo(true);
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
                    <h4>Choose a file before pressing the Play/Download button</h4>
                </div>
            );
        }
    };

    return (
        <div>
            <h1>Upload your file here</h1>
            <div>
                <input type="file" onChange={onFileChange} accept=".jpg,.jpeg" />
                <button onClick={handleVideo}>Play/Download Video</button>
            </div>
            {fileData()}
            {/* Conditional rendering based on showVideo state */}
            {showVideo && selectedFile && (
                <div>
                    <h2>Video:</h2>
                    <video width="320" height="240" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <br />
                    <a href={videoUrl} download>Download Video</a>
                </div>
            )}
        </div>
    );
}

export default App;
