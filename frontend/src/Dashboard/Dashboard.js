import React, { useEffect } from "react";
import { styled } from "@mui/material";
import SideBar from "./SideBar/SideBar";
import FriendsSidebar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
}); 

const Dashboard = ({ setUserDetails }) => {

  // Retrieve user details from local storage and set it in the state
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);
    
  return (<Wrapper>
    <SideBar />
    <FriendsSidebar />
    <Messenger />
    <AppBar />
  </Wrapper>);

};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }
};

export default connect(null, mapActionsToProps)(Dashboard);