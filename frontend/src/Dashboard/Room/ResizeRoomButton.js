import React from 'react';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenFullscreenIcon from '@mui/icons-material/OpenInFull';

const MainContainer = styled('div')({
    position: 'absolute',
    bottom: '5px',
    right: '5px',
});

const ResizeRoomButton = ({ isRoomMinimized, handleRoomResize }) => {
    return (
        <MainContainer>
            <IconButton style={{ color: 'white' }} onClick={handleRoomResize}>
                {isRoomMinimized? <OpenFullscreenIcon /> : <CloseFullscreenIcon />}
            </IconButton>
        </MainContainer>
    );
};

export default ResizeRoomButton;