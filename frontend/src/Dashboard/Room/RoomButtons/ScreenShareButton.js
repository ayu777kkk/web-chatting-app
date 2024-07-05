import React from 'react';
import IconButton from '@mui/material/IconButton';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';

const ScreenShareButton = () => {
    const [screenShareEnabled, setScreenShareEnabled] = React.useState(false);

    const handleToggleScreenShare = () => {
        setScreenShareEnabled(!screenShareEnabled);
    };

    return (
        <IconButton onClick={handleToggleScreenShare} style={{ color: 'white' }}>
            {screenShareEnabled? <ScreenShareIcon  /> : <StopScreenShareIcon />}
        </IconButton>
    );
};

export default ScreenShareButton;