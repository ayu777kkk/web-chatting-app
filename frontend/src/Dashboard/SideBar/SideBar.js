import React from "react";
import { styled } from "@mui/material";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import ActiveRoomButton from "./ActiveRoomButton";
import { connect } from 'react-redux';

const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "72px",
  alignItems: "center",
  backgroundColor: "#202225",
}); 

const SideBar = ({ activeRooms, isUserInRoom }) => {
    
  return (
  <MainContainer>
    <MainPageButton />
    <CreateRoomButton />
    {activeRooms.map((room) => (
      <ActiveRoomButton
        roomId={room.roomId}
        creatorUsername={room.creatorUsername}
        numberOfParticipants={room.participants.length}
        key={room.roomId}
        isUserInRoom={isUserInRoom}
      />
    ))}
  </MainContainer>
  );

};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  }
};

export default connect(mapStoreStateToProps)(SideBar);