import React from "react";
import { styled } from "@mui/material";
import DropdownMenu from "./DropdownMenu";

const MainContainer = styled("div")({
    position: "absolute",
    top: 0,
    right: 0,
    height: "48px",
    width: "calc(100% - 326px)",
    borderBottom: "1px solid #2F3136",
    backgroundColor: "#36393f",  
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 15px",
}); 

const AppBar = () => {
    
  return <MainContainer>
    <DropdownMenu />
  </MainContainer>;

};

export default AppBar;