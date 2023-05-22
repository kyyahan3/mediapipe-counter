import React, { useState, Upload, useRef } from "react";
import {Button, Space} from "antd";
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Player } from "video-react";
import '../node_modules/video-react/dist/video-react.css';

function SignIn() {
    return(
        <div style = {{float:"right", display:"black", width:"100px"}}>
        <Button style={{
            backgroundColor:'transparent',
            color:"rgba(255, 255, 255)",
            borderWidth:"1px",
            borderColor:"white"
        }}
        size="large"
        type="primary"
        >Sign In</Button>

        </div>
    );
}

const Video = () => {
  const [src, setSrc] = useState("");
  const fileInputRef = useRef();


  const handleChange = (event) => {
    try {
      // Get the uploaded file
      const file = event.target.files[0];

      // Transform file into blob URL
      setSrc(URL.createObjectURL(file));
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
        <div onClick={handleVideoClick}>
            <video src={src} controls width="100%">
            Sorry, your browser doesn't support embedded videos.
            </video>
        </div>
        <input type="file" accept="video/*" onChange={handleChange} ref={fileInputRef} hidden/>
    </>
  );
};

function Count({ enabled = false }) {
    return(
        <Button
            type="primary" block
            style={{
                backgroundColor:enabled ? 'rgba(0, 159, 93, 0.85)' : 'rgba(0, 159, 93, 0.25)',
                color:"white",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            size="large"
        >
            <span style={{ display: "flex", alignItems: "center" }}>
                <VideoCameraAddOutlined style={{ marginRight: "15px" }}/>
                Start Counting
            </span>
        </Button>
    );
}

export default { SignIn, Video, Count };
