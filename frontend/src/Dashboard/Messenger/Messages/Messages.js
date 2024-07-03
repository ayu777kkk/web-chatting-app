import React, { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import MessagesHeader from './MessagesHeader';
import { connect } from 'react-redux';
import DUMMY_MESSAGES from './DUMMY_MESSAGES';
import Message from './Message';
import DateSeparator from './DateSeparator';

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const convertDateToHumanReadable = (date, format) => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yyyy: date.getFullYear(),
    }
    return format.replace(/mm|dd|yyyy/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails, messages }) => {
    return (
    <MainContainer>
        <MessagesHeader name={chosenChatDetails?.name} />
        {messages.map((message, index) => {
            const sameAuthor = index > 0 && 
              messages[index].author._id === messages[index-1].author._id;
            const sameDay = index > 0 && 
              convertDateToHumanReadable(new Date(messages[index].date),"yyyy/mm/dd") === 
              convertDateToHumanReadable(new Date(messages[index-1].date), "yyyy/mm/dd");
              // .toDateString()

            return <div key={message._id} style={{ width: "97%" }}>
                {(!sameDay || index === 0) && (
                    <DateSeparator 
                      date={convertDateToHumanReadable(
                        new Date(message.date),
                        'yyyy/mm/dd'
                      )}
                    />
                )}
                <Message
                  key={message._id}
                  content={message.content}
                  username={message.author.username}
                  sameAuthor={sameAuthor}
                  date={convertDateToHumanReadable(
                      new Date(message.date),
                      'yyyy/mm/dd'
                  )}
                  sameDay={sameDay}
                />
            </div>;
        })}
    </MainContainer>
);
};

const mapStateToProps = ({ chat }) => {
    return {
        ...chat,
    }
};

export default connect(mapStateToProps)(Messages);