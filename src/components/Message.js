import React from 'react'
import '../Styles/Message.css';
import { useStateValue } from '../StateProvider';

function Message({name,message,time}) {
    const [{user}]=useStateValue();

    return (
        <div className={(name===user.displayName ? 'myMSG' : 'MSG')}>
            <span className="chatName">{name}</span>
            {message}
            <span className="messageTime">{new Date(time?.toDate()).toUTCString()}</span>
        </div>
    )
}

export default Message;
