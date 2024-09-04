import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; // Import axios
import { toast } from 'react-toastify';
import axiosInstance from "../../axiosinstance/AxoisInstance";
const Scan = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleDivClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("qrImage", selectedFile); // Append file to FormData

      try {
        const response = await axiosInstance.post(
          "/task/scan-inventory", 
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${token}`, 
          },}
        );
        toast.success("QR match successful..")
        navigate('/')
        // Handle successful response
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("Error uploading file");
        }
        console.error("Error uploading file:", error);
      }
      
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="container1">
      <div className="qr-section">
        <div className="qr-box">
          <h2>Upload QR Code</h2>
          <div
            className="qr-frame"
            onClick={handleDivClick}
            style={{ cursor: "pointer" }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Selected QR Code"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <p>Click to upload</p>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            name="qrImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button className="upload-button" onClick={handleSubmit}>
            Upload
          </button>
        </div>

        <div className="qr-box">
          <h2>Scan QR Code</h2>
          <div className="qr-frame">{/* Placeholder for QR Code Scanner */}</div>
          <button className="upload-button">Enable Webcam</button>
        </div>
      </div>
    </div>
  );
};

export default Scan;
