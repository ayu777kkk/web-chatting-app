import React from "react";
import { styled } from "@mui/material";
import { connect } from "react-redux";
import WelcomeMessage from "./WelcomeMessage";
import MessengerContent from "./MessengerContent";

const MainContainer = styled("div")({
  display: "flex",
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "48px",
}); 

const Messenger = ({ chosenChatDetails }) => {
    
  return (<MainContainer>
    {!chosenChatDetails? (
        <WelcomeMessage />
      ) : (
      <MessengerContent chosenChatDetails = {chosenChatDetails} />
    )}
  </MainContainer>);

};

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  }
};

export default connect(mapStateToProps)(Messenger);