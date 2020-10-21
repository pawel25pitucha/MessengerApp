import React, { useState , useEffect} from 'react'
import  '../Styles/Sidebar.css'
import Avatar from '@material-ui/core/Avatar';     
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';

function Sidebar() {
    const [chatRooms,setChatRooms] = useState([]);
    const [helper,setHelper] = useState([]);
    const [{user}]=useStateValue();


    useEffect(() => {
     const connect= db.collection('ChatRooms').orderBy('lastActivity','desc').onSnapshot(snapshot => (
          setChatRooms(snapshot.docs.map(doc => (
              {
                  id: doc.id ,
                  data: doc.data(),
                  lastActivity: doc.lastActivity,
              }
          )))
      ));
      return () => {
          connect();
      }
    }, [])



    const addNewChat = () =>{
        const chatName = prompt('Enter a chat name bro');
        if(chatName){
            db.collection('ChatRooms').add({
                name: chatName,
                lastActivity: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }

    }

    const Search= (event) => {
        console.log(chatRooms);
        event.preventDefault();
        if (helper.length===0)  setHelper(chatRooms);
        const filtered=chatRooms.filter((room) => room.data.name.search(event.target.value) != -1); 
        if(filtered.length>0) setChatRooms(filtered);
        if (event.target.value==="") setChatRooms(helper);
        
    }

    return (
        <div className="Sidebar">
            <div className="Sidebar__header">
                <Avatar src={user.photoURL}/>
                <div className="Sidebar__header__right">
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="Sidebar__search">
                <SearchIcon/>
                <input type="text" onChange={Search} placeholder="Search..."></input>
            </div>
            <div onClick={addNewChat} className="Sidebar__newChat">
                <h2>New Chat</h2>
                <AddIcon />
            </div>
            <div className="Sidebar__chats">
                {
                    chatRooms.map(room=>(
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    ))
                }
            </div>
          

        </div>
    )
}

export default Sidebar;
