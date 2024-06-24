import React from 'react';
import Buttons from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import { border, margin, minWidth } from '@mui/system';

const MainPageButton = () => {

  return (
    <Buttons
      style = {{
        width: '48px',
        height: '48px',
        borderRadius: '16px',
        margin: '0',
        padding: '0',
        minWidth: '0',
        marginTop: '10px',
        color: 'white',
        backgroundColor: '#5065F2',
      }}
    >
        <GroupsIcon />
    </Buttons>
  )
}

export default MainPageButton;