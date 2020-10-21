import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import { useStateValue } from './StateProvider';



function App() {
  const [{user}]=useStateValue();
  return (
    (!user) ? (
      <Login />
    )
    : (
      <div className="App">
      <div className="App__body">
        <Router>
          <Sidebar /> 
            <Switch>
    
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>

            </Switch>
        </Router>
      
      </div>
    </div>
    )
  );
}
export default App;
