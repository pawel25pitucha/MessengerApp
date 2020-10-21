import React from 'react'
import { Avatar } from '@material-ui/core'
import "../Styles/SidebarChat.css";
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import db from '../firebase';

function SidebarChat({id , name}) {
    const [avatarPic,setAvatarPic] = useState("");
    const [avatarSex,setAvatarSex] = useState("");
    const [lastMSG,setLastMSG] = useState([]);

    useEffect(() => {
      const seed=Math.floor(Math.random()*5000);
      setAvatarPic(seed);
     if (seed%2===0) setAvatarSex("male") 
     else setAvatarSex("female");

        db.collection("ChatRooms").doc(id).collection("messages").orderBy('time','desc').onSnapshot(snapshot => (
            setLastMSG(snapshot.docs.map((doc)=>doc.data()))
        ))
    }, [])

    return (
        <Link to={`/rooms/${id}`}>
            <div className="SidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/${avatarSex}/${avatarPic}.svg`} />
                <div className="SidebarChat__text">
                    <h4>{name}</h4>
                    <p>{lastMSG[0]?.message}</p>
                </div>
            
            </div>
        </Link>
    
    )
}

export default SidebarChat
