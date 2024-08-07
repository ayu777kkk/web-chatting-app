import React from "react";
import { styled } from '@mui/system';
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton"; 
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/roomActions";

const MainContainer = styled('div')({
    height: '18%',
    width: '100%',
    backgroundColor: '#5865f2',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const RoomButttons = (props) => {
    const { localStream } = props;

    return (
    <MainContainer>
        <ScreenShareButton {...props} />
        <MicButton localStream={localStream} />
        <CloseRoomButton />
        <CameraButton localStream={localStream} />
    </MainContainer>
    );
}

const mapStoreStateToProps = ({ room }) => {
    return {
        ...room,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    }
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButttons);