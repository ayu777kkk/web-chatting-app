import React from "react";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "../../shared/components/Avatar";
import * as roomHandler from '../../realtimeCommunication/roomHandler';

const ActiveRoomButton = ({ 
    creatorUsername,
    roomId,
    numberOfParticipants,
    isUserInRoom,
}) => {
    const handleJoinActiveRoom = () => {
        if (numberOfParticipants < 4) {
            roomHandler.joinRoom(roomId);
        }
    };

    const activeRoomButtonDisabled = numberOfParticipants > 3;
    const roomTitle = `Creator: ${creatorUsername}. Members: ${numberOfParticipants}`;

    return <Tooltip title={roomTitle}>
        <div>
            <Button 
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
              disabled={activeRoomButtonDisabled || isUserInRoom} 
              onClick={handleJoinActiveRoom}>
                <Avatar username={creatorUsername} />
            </Button>
        </div>
    </Tooltip>
};

export default ActiveRoomButton;