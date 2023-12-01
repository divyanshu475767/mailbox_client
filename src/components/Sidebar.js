import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {

  


  return (

    
    <aside className="sidebar">
      <nav className="nav">
        <ul>
          <li ><NavLink to="/">My Mails</NavLink></li>
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
