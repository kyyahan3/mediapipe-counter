import React ,{useState, Upload, useRef } from 'react';
import { Select, Button, Layout, List, Card, Rate, Space } from 'antd';
import {Link} from 'react-router-dom';
import Buttons from './Buttons';
//import DropDown from './DropDown';

import { VideoCameraAddOutlined } from '@ant-design/icons'
import { Player } from "video-react";
import '../node_modules/video-react/dist/video-react.css';

//const {Content} = Layout;
//const {Meta} = Card;


// body overall component
const Body = ({windowHeight}) => {
    /*** Upload Vid ***/
    const [src, setSrc] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const fileInputRef = useRef();

    const handleChange_vid = (event) => {
        try {
          // Get the uploaded file
          const file = event.target.files[0];

          // Transform file into blob URL
          setSrc(URL.createObjectURL(file));
          setUploaded(true); // set uploaded state to true
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
    const [selected, setSelected] = useState(false)

    const handleChange_select = (value: string) => {
      console.log(`selected ${value}`);
      setSelected(true);
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
                    <Buttons.Count enabled = { selected && uploaded } />
                </div>
            </Space>
        </div>
    );
}


export default Body;


