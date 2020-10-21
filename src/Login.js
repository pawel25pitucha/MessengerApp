import React  from 'react'
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import "./Styles/Login.css";

function Login() {
    const [{user},dispatch]=useStateValue();

    const googleLogin = () =>{
        auth
        .signInWithPopup(provider)
        .then((result) =>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((err)=>alert(err.message)); 
    }; 

    return (
            <div className="Login">
            <img src="http://www.ryl2u.com/images/login1.png"></img>
            <button className="LoginBTN" onClick={googleLogin}>Login with google dude!</button>
            </div>
    )
              
           
      
     
   
}

export default Login
