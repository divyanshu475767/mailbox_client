import React, { useEffect, useState } from 'react';
import ReceivedEmail from './RecievedMail';
import './ReceivedMailList.css';
import axios from 'axios';
import { useSelector } from "react-redux";


const ReceivedEmailList = () => {


    const token = useSelector(state=>state.auth.token)

   const [receivedMails , setReceivedMails] =   useState([]);

    useEffect(()=>{
      axios({
        method: "get",
        url: "http://localhost:5000/receivedMails",
        headers:{Authorization:token}  
      })
      .then(response=>{
        setReceivedMails(response.data);
        console.log(response.data);

      })
      .catch(error=>{
        console.log(error)
        
      })
    },[token])


  return (
    <div className='inbox'>
      <h1 className='heading'>Your Inbox</h1>

      {receivedMails.map(mail=>{
       return <ReceivedEmail
        sender={mail.senderName}
        subject={mail.title}
        content={mail.content}
      />
      })
      }


      
      
    </div>
  )
}

export default ReceivedEmailList
