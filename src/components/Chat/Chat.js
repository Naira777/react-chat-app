import React, { useEffect, useState } from 'react';
import './Chat.css';
import queryStrig from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({location}) => {

const [name, setName]= useState('');
const [room, setRoom]= useState('');
const [users, setUsers]= useState('');
const [message, setMessage]= useState('');
const [messages, setMessages]= useState([]);


const ENDPOINT = 'https://react-chat-app3.herokuapp.com/';



useEffect(()=> {


const {name, room}= queryStrig.parse(location.search);

socket = io(ENDPOINT);


setName(name);
setRoom(room);

socket.emit('join', {name, room}, (error) => {
if(error){

alert(error);

}
});


}, [ENDPOINT, location.search]);


useEffect(() => {

socket.on('message', (message)=> {
setMessages(messages => [...messages, message]);

});

socket.on('roomData', ({users})=> {
setUsers(users);
});

}, []);



// function for sending messages

const sendMessage = (event) => {

event.preventDefault();

    if(message) {

   socket.emit('sendMessage', message, () => setMessage(''));

    }
}



return (
<div className= "outerContainer">
    <div className="container">
         <InfoBar room= {room} />
         <Messages messages = {messages} name = {name} />
         <Input  message={message}  setMessage= {setMessage} sendMessage={sendMessage} />
</div>

      <TextContainer users= {users} />

    </div>
)


}
export default Chat;