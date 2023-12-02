import React, { useEffect } from 'react';
import ReceivedEmail from './RecievedMail';
import './ReceivedMailList.css';
import axios from 'axios';
import { useSelector , useDispatch } from "react-redux";
import  {inboxActions} from '../store/inbox-slice';



const SentEmailList = () => {

    const dispatch = useDispatch();


    const token = useSelector(state=>state.auth.token)
    
    const sentMails = useSelector(state=>state.inbox.sentMails);

   
    useEffect(()=>{
      axios({
        method: "get",
        url: "http://localhost:5000/sentMails",
        headers:{Authorization:token}  
      })
      .then(response=>{
       dispatch(inboxActions.sentMails(response.data));
        console.log(response.data)
      })
      .catch(error=>{
        console.log(error)
        
      })
    },[token,dispatch])


  return (
    <div className='inbox'>
      <h1 className='heading'>Your Sent Mails</h1>

      {sentMails.map(mail=>{
       return <ReceivedEmail
       key={mail.id}
       id={mail.id}
       sender={mail.receiver}
       subject={mail.title}
       content={mail.content}
       isRead={mail.isRead}
       isShown={false}
       canUpdateStatus = {false}
      />
      })
      }
    </div>
  )
}

export default SentEmailList
