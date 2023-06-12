import React ,{useState, Upload, useRef } from 'react';
import { Select, Button, Layout, List, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import ProcessedVideo from './ProcessedVideo';

import axios from 'axios';

import { VideoCameraAddOutlined } from '@ant-design/icons'
// import { Player } from "video-react";
import '../node_modules/video-react/dist/video-react.css';



// body overall component
const Body = ({windowHeight}) => {
    // variables send to back end
    const [selectedVideo, setSelectedVideo] = useState(""); // store the original video
    const [selectedMotion, setSelectedMotion] = useState("")    // store the selected exercise type

    /*** Upload Vid ***/
    const [src, setSrc] = useState("");     // store the video URL for thumbnail
    const [isUploaded, setIsUploaded] = useState(false);    // bool for checking if the video is uploaded successfully
    const fileInputRef = useRef();

    const handleChange_vid = async (event) => {
        try {
          // Get the uploaded file
          const file = event.target.files[0];
          setSrc(URL.createObjectURL(file));    // Transform file into blob URL
          setIsUploaded(true); // set isUploaded state to true

          setSelectedVideo(file);

        } catch (error) {
          console.error(error);
        }
    };

    const handleVideoClick = () => {
        fileInputRef.current.click();
    };

    // Get the thumbnail
    const [thumbnail, setThumbnail] = useState("");
    const handleLoadedMetadata = (event) => {
        const video = event.target;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.height, canvas.width);

        const thumbnailURL = canvas.toDataURL();
        setThumbnail(thumbnailURL);
        };

    /***  Drop Down ***/
    const [isSelected, setSelected] = useState(false)

    const handleChange_select = (value: string) => {
      console.log(`isSelected ${value}`);
      setSelected(true);
      setSelectedMotion(value);
    };


    const [response, setResponse] = useState(null); // store the response from the backend
    const [videoFrames, setVideoFrames] = useState([]); // store only the video

    const [frameIndex, setFrameIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleClick = () => {
        // Construct the data payload to send to the backend
        const data = {
            video: selectedVideo,
            clickInfo: selectedMotion,
        };
        const formData = new FormData();
        formData.append('video', selectedVideo);
        formData.append('clickInfo', selectedMotion);

        axios
            .post('/api/upload_video_endpoint', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
                })
            .then(response => {
                const responseData = response.data;
                setResponse(responseData); // get the backend result
                setVideoFrames(`data:video/mp4;base64,${responseData.frames}`);
                console.log(responseData.date, responseData.category, responseData.count);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const BackendActionButton = ({ enabled = false }) => (
      <div>
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
            disabled={!enabled}
            onClick={handleClick}
        >
            <span style={{ display: "flex", alignItems: "center" }}>
                <VideoCameraAddOutlined style={{ marginRight: "15px" }}/>
                Start Counting
            </span>
        </Button>
      </div>
    );

    const [showProcessedVideo, setShowProcessedVideo] = useState(false);
    const handleShowProcessedVideo = () => {
        setShowProcessedVideo(!showProcessedVideo);
    };      

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
            <Space
                direction="vertical"
                style={{ width: '90%' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <div onClick={handleVideoClick}>
                        {thumbnail ? <img src={thumbnail} alt="Video Thumbnail" /> : (
                          <video src={src} controls width="100%" >
                            Sorry, your browser doesn't support embedded videos.
                          </video>
                      )}
                    </div>
                    <input type="file" accept="video/*" onChange={handleChange_vid} ref={fileInputRef} hidden/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <Space wrap>
                        <Select
                          placeholder="Select a exercise"
                          style={{ width: 300}}
                          onChange={handleChange_select}
                          options={[
                            { value: 'Crunch', label: 'Crunch'},
                            { value: 'JumpRope', label: 'Jump rope' },
                            { value: 'PushUp', label: 'Push up' },
                            { value: 'PullUp', label: 'Pull up' },
                            { value: 'Squat', label: 'Squat' },
                          ]}
                        />
                      </Space>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BackendActionButton enabled={isSelected && isUploaded} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', marginTop:'20px' }}>
                    {response && (
                        <div style={{ border: '1px solid gray', padding: '15px', borderRadius: '8px' }}>
                            <p>Count: {response.count}</p>
                            <p>Date: {response.date}</p>
                        </div>
                    )}
                </div>


                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <Button onClick={handleShowProcessedVideo}>Play Processed Video</Button>
                </div>
                {showProcessedVideo && <ProcessedVideo enabled={response}/>}
            </Space>
        </div>
    );
}

export default Body;


