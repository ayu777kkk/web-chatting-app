import React from 'react';

const DUMMY_MESSAGES = [
    {
        _id: 1,
        content: "Hello, how are you?", 
        sameAuthor: false,
        author:{ username: "test1", },
        date: "10/05/2021",
        sameDay: false,
    },
    {
        _id: 2,
        content: "Hello again", 
        sameAuthor: true,
        author:{ username: "test1", },
        date: "10/05/2021",
        sameDay: true,
    },
    {
        _id: 3,
        content: 'hello third time',
        sameAuthor: true,
        author:{ username: 'test1', },
        date: '11/05/2021',
        sameDay: false
      },
      {
        _id: 4,
        content: 'hello response first time',
        sameAuthor: false,
        author:{ username: 'test2', },
        date: '11/05/2021',
        sameDay: false
      },
      {
        _id: 5,
        content: 'hello response third time',
        sameAuthor: true,
        author:{ username: 'test2', },
        date: '11/05/2021',
        sameDay: true
      },
];

export default DUMMY_MESSAGES;