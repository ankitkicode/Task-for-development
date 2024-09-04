import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from "../../axiosinstance/AxoisInstance";

const Scan = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [videoStream, setVideoStream] = useState(null); // State to hold the video stream

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
      formData.append("qrImage", selectedFile);

      try {
        const response = await axiosInstance.post(
          "/task/scan-inventory", 
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${token}`, 
            }
          }
        );
        toast.success("QR match successful..");
        navigate('/');
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

  const handleEnableWebcam = async () => {
    if (isWebcamEnabled) {
      // Stop the webcam
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop()); // Stop all tracks
      }
      setIsWebcamEnabled(false);
      setVideoStream(null);
    } else {
      // Start the webcam
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        setIsWebcamEnabled(true);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        alert("Error accessing webcam. Please check if you have given permission.");
      }
    }
  };

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream; // Set the video stream
    }
    
    // Cleanup on component unmount
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop()); // Stop all tracks when component unmounts
      }
    };
  }, [videoStream]); // Dependency on videoStream

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
          <div className="qr-frame">
            {isWebcamEnabled ? (
              <video ref={videoRef} autoPlay style={{ width: "100%", height: "100%" }} />
            ) : (
              <p>Webcam is not enabled</p>
            )}
          </div>
          <button className="upload-button" onClick={handleEnableWebcam}>
            {isWebcamEnabled ? "Stop Webcam" : "Enable Webcam"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scan;
