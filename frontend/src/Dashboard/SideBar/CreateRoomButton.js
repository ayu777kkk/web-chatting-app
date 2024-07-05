import React from 'react';
import Buttons from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import * as roomHandler from '../../realtimeCommunication/roomHandler';

const CreateRoomButton = () => {
    const createNewRoomHandler = () => {
        // creating a room and sending its info to the server
        roomHandler.createNewRoom();
    };

    return (
        <Buttons
            onClick={createNewRoomHandler}
            style={{
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
            <AddIcon />
        </Buttons>
    );
};

export default CreateRoomButton;