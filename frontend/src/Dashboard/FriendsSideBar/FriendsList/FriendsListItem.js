import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '../../../shared/components/Avatar';
import { Typography } from '@mui/material';
import OnlineIndicator from './OnlineIndicator';

const FriendsListItem = ({ id, username, isOnline }) => {
    return (
        <Button
        style={{
            width: '100%',
            height: '42px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'black',
            position: 'relative',
            //backgroundColor: isOnline? '#4CAF50' : '#f44336',
        }}>
            <Avatar username={username} />
            <Typography style={{
                marginLeft: '8px',
                fontWeight: 700,
                color: '#8e9297'
            }}
            variant="subtitle2"
            align="left">
                {username}
            </Typography>
            {isOnline && <OnlineIndicator/>}
        </Button>
    );
};

export default FriendsListItem;