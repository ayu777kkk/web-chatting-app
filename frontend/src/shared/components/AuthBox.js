import React from "react";
import Box from "@mui/material/Box"; // @ material-ui/core/Box"
import { styled } from "@mui/system";

const BoxWrapper = styled('div')({

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  background: '#5865F2',

  '& > *': {
    margin: '1rem',
  },    
});    

const AuthBox = (props) => {
    
  return (
    <BoxWrapper>
      <Box
        sx={{
            width: '700px',
            height: '430px',
            bgcolor: '#36393f',
            borderRadius: '5px',
            boxShadow: '0px 2px 10px 0px, rgb(0 0 0`/ 20%)',
            display: 'flex',
            flexDirection: 'column',
            padding: '25px',
        }}>
        {props.children}
      </Box>
    </BoxWrapper>);

};

export default AuthBox;