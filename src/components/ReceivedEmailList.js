import React, { useEffect } from 'react';
import ReceivedEmail from './RecievedMail';
import './ReceivedMailList.css';
import axios from 'axios';
import { useSelector , useDispatch } from "react-redux";
import  {inboxActions} from '../store/inbox-slice';



const ReceivedEmailList = () => {

    const dispatch = useDispatch();

    const inbox = useSelector(state=>state.inbox.receivedMails);

    const token = useSelector(state=>state.auth.token)

   
    useEffect(()=>{
      axios({
        method: "get",
        url: "http://localhost:5000/receivedMails",
        headers:{Authorization:token}  
      })
      .then(response=>{
        dispatch(inboxActions.fetchMails(response.data));
        console.log(response.data)
      })
      .catch(error=>{
        console.log(error)
        
      })
    },[token,dispatch])


  return (
    <div className='inbox'>
      <h1 className='heading'>Your Inbox</h1>

      {inbox.map(mail=>{
       return <ReceivedEmail
       key={mail.id}
       id={mail.id}
       sender={mail.senderName}
       subject={mail.title}
       content={mail.content}
       isRead={mail.isRead}
      />
      })
      }


      
      
    </div>
  )
}

export default ReceivedEmailList
