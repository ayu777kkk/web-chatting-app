import React from "react";
import { styled } from "@mui/material";
import MainPageButton from "./MainPageButton";

const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "72px",
  alignItems: "center",
  backgroundColor: "#202225",
}); 

const SideBar = () => {
    
  return (
  <MainContainer>
    <MainPageButton />
  </MainContainer>
  );

};

export default SideBar;