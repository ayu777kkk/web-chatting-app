import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const checkOnlineFriends = (friends = [], onlineUsers = []) => {
  friends.forEach((friend) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === friend.id);
    friend.isOnline = isUserOnline? true : false;
  });
  return friends;
};

const FriendsList = ({ friends, onlineUsers }) => {
  return <MainContainer>
    {checkOnlineFriends(friends, onlineUsers).map((friend) => (
      <FriendsListItem 
        username={friend.username} 
        id={friend.id} 
        isOnline={friend.isOnline} 
        key={friend.id}/>
    ))}
  </MainContainer>;
};

const mapStoreStateToProp = ({ friends }) => {
  return { 
    ...friends,
  };
};

export default connect(mapStoreStateToProp)(FriendsList);