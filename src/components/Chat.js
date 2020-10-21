import React, { useState , useEffect } from 'react'
import '../Styles/Chat.css';
import Avatar from '@material-ui/core/Avatar';    
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Message from './Message';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from "firebase";

function Chat() {

    const {roomId} = useParams();
    const [roomName,setRoomName]=useState("");
    const [messages,setMessages]=useState([]);
    const [input,setInput]=useState("");
    const [{user}]=useStateValue();
    const [lastSeen,setLastSeen]=useState("");

    useEffect(() => {
        if(roomId){
            db.collection("ChatRooms").doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))
            db.collection("ChatRooms").doc(roomId).collection("messages").orderBy('time','asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            ))

            db.collection("ChatRooms").doc(roomId).onSnapshot(snapshot=>(
                setLastSeen(new Date(snapshot.data().lastActivity?.toDate()).toUTCString())
            ))
        }
    }, [roomId])

    const inputChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const sendMessage = () => {
        db.collection("ChatRooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        });
        db.collection("ChatRooms").doc(roomId).update({lastActivity: firebase.firestore.FieldValue.serverTimestamp()});
        setInput("");
    }
    const onSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    }
 
    return (
        <div className="Chat">
            <div className="Chat__header">
                <Avatar />
                <div className="Chat__header__right">
                <h2>{roomName}</h2>
                    <p>Online: {lastSeen}</p>
                </div>
            </div>

            <div className="Chat__main">
              {
                  messages.map((msg)=>(
                      <Message name={msg.name} message={msg.message} time={msg.time}/>
                  ))
              }
            </div>


            <div className="Chat__footer">
                <InsertEmoticonIcon/>
                <form onSubmit={onSubmit}>
                <input value={input}  onChange={inputChange} placeholder="type message here"></input>
                </form>
                <div className="Chat__footer__right">
                    <SendIcon onClick={sendMessage}/>
                </div>
            </div>
        </div>
        
    )
}
export default Chat;
