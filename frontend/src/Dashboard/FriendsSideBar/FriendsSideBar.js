import React from "react";
import { styled } from "@mui/material";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList/FriendsList";
import PendingInvitationsList from "./PendingInvitationsListItem/PendingInvitationsList";

const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "224px",
  alignItems: "center",
  backgroundColor: "#2F3136",
}); 

const FriendsSidebar = () => {
    
  return (<MainContainer>
    <AddFriendButton />  
    <FriendsTitle title='Private Messages' />  
    <FriendsList />
    <FriendsTitle title='Invitations' />  
    <PendingInvitationsList />
  </MainContainer>);

};

export default FriendsSidebar;