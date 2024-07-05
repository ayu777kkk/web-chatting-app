import React, { useState } from "react";
import { styled } from '@mui/system';
import ResizeRoomButton from "./ResizeRoomButton";
import VideoContainer from "./VideosContainer";
import RoomButttons from "./RoomButtons/RoomButtons";

const MainContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    backgroundColor: '#202225',
});

const fullScreenRoomStyle = {
    width: '100%',
    height: '100vh',
}

const minimizedRoomStyle = {
    bottom: '0px',
    right: '0px',
    width: '30%',
    height: '40vh',
}

const Room = () => {
    const [isRoomMinimized, setIsRoomMinimized] = useState(true);

    const roomResizeHandler = () => {
        setIsRoomMinimized(!isRoomMinimized);
    }

    return (
        <MainContainer style={isRoomMinimized? minimizedRoomStyle : fullScreenRoomStyle}>
            <VideoContainer />
            <RoomButttons />
            <ResizeRoomButton 
                isRoomMinimized={isRoomMinimized}
                handleRoomResize={roomResizeHandler}
            />
        </MainContainer>
    );
};

export default Room;