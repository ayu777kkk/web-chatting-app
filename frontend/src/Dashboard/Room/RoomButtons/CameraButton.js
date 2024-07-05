import React from 'react';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const CameraButton = () => {
    const [cameraOn, setCameraOn] = React.useState(true);

    const handleToggleCamera = () => {
        setCameraOn(!cameraOn);
    };

    return (
    <IconButton onClick={handleToggleCamera} style={{ color: 'white' }}>
        {cameraOn? <VideocamIcon  /> : <VideocamOffIcon />}
    </IconButton>
    );
};

export default CameraButton;