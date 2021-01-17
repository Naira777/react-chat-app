import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';
import { stringify } from 'query-string';

const Message = ({ message: { user, text, hour, min}, name}) => {
 
 

  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }



  return (
    isSentByCurrentUser
      ? (<div>
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
           <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
            {(min<10) 
            ? <time className ="time1">{hour}:{`0`+ min.toString()}</time> 
            : <time className ="time1">{hour}:{min}</time> }
        </div> 
      
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p> {(min<10) 
            ? <time className ="time1">{hour}:{`0`+ min.toString()}</time> 
            : <time className ="time1">{hour}:{min}</time> }
          </div>
        )
  );
}

export default Message;