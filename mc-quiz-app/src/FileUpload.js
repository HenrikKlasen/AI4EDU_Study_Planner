import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // Simulate a backend call
    fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log('Files uploaded successfully:', data))
      .catch(error => console.error('Error uploading files:', error));
  };

  return (
    <div className="file-upload-container" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>Upload PDF Files</h2>
      <p>Drag and drop your files here, or click to browse</p>
      <label htmlFor="file-input" className="file-input-label">Browse Files</label>
      <input
        type="file"
        id="file-input"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </button>
      {files.length > 0 && (
        <div className="file-list">
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;