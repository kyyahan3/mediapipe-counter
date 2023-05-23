import React, { useState } from "react";
import {Button} from "antd";
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

export default { SignIn };
