import React from 'react';
import IconButton from '@mui/material/IconButton';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import * as webRTCHandler from '../../../realtimeCommunication/webRTCHandler';

const constraints = {
    audio: false,
    video: true,
};

const ScreenShareButton = ({
    localStream,
    screenSharingStream,
    setScreenSharingStream,
    isScreenSharingActive,
}) => {
    const handleToggleScreenShare = async () => {
        if (!isScreenSharingActive) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constraints);
            } catch (error) {
                console.error('Error occuered while sharing screen:', error);
            }

            if (stream) {
                setScreenSharingStream(stream);
                webRTCHandler.switchOutgoingTracks(stream);
            }
        } else {
            webRTCHandler.switchOutgoingTracks(null);
            screenSharingStream.getTracks().forEach((track) => track.stop());
            setScreenSharingStream(null);
        }
    };

    return (
        <IconButton onClick={handleToggleScreenShare} style={{ color: 'white' }}>
            {isScreenSharingActive? <ScreenShareIcon  /> : <StopScreenShareIcon />}
        </IconButton>
    );
};

export default ScreenShareButton;