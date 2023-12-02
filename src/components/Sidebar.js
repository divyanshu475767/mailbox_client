import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {

  
  const unreadMessages = useSelector(state=>state.inbox.unreadMessages)

  return (

    
    <aside className="sidebar">
      <nav className="nav">
        <ul>
          <li ><NavLink to="/">My Mails ({unreadMessages})</NavLink></li>
          <li >
            <NavLink to='/sentMails' >Sent mails</NavLink></li>
          <li ><NavLink to='/newMail'>New mails</NavLink></li>
          <li>  <NavLink to="/Logout">Logout</NavLink></li>
        </ul>
      </nav>
    </aside>

  
  );
};

export default Sidebar;
