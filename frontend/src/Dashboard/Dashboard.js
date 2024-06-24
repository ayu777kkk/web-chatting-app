import React, { useEffect } from "react";
import { styled } from "@mui/material";
import SideBar from "./SideBar/SideBar";
import FriendsSidebar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";

const Wrapper = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100%",
}); 

const Dashboard = ({ setUserDetails }) => {

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    console.log("Retrieved user details:", userDetails);
    if (!userDetails) {
      console.log("No user details found, logging out...");
      logout();
    } else {
      console.log("Setting user details:", JSON.parse(userDetails));
      setUserDetails(JSON.parse(userDetails));
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