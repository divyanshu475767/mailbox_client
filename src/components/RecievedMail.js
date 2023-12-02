import React from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import './ReceivedEmail.css';
import { NavLink } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import  {inboxActions} from '../store/inbox-slice';

const ReceivedEmail = ({id, sender, subject, content,isRead , isShown  , canUpdateStatus}) => {

  const dispatch = useDispatch();
   const token = useSelector(state=>state.auth.token);

  // Function to sanitize HTML content and extract text for preview
  const sanitizeAndPreview = (html) => {
    const sanitizedHTML = DOMPurify.sanitize(html); // Sanitize the HTML content
    const strippedText = sanitizedHTML.replace(/(<([^>]+)>)/gi, ''); // Extract text without HTML tags
    return strippedText.length > 100 ? `${strippedText.substring(0, 100)}...` : strippedText;
  };

  const previewContent = sanitizeAndPreview(content);


  const updateStatusHandler =async ()=>{


    if(canUpdateStatus){
    const response = await axios({
      method: "put",
      url: "http://localhost:5000/updateReadStatus",
      data: {mailId:id},
      headers:{Authorization:token}
    });

    
    console.log(response.data);
    alert(response.data);

  }


  }


  const deleteHandler =async ()=>{
     await axios({
      method: "delete",
      url: "http://localhost:5000/deleteMail",
      data: {mailId:id},
      headers:{Authorization:token}
    });

   dispatch(inboxActions.deleteMail(id));
  }




  return (
    <>
    <NavLink to={`/mail/${id}`} style={{textDecoration:"none"}} className='navvv' exact>
    
    <div className="email" onClick={updateStatusHandler}>
     
    
    
    {
      isShown && !isRead && <span className='isRead'></span>
    }
      <div className="sender">{sender}</div>
      <div className="subjectMinor">{subject}</div>
      <div className="content" dangerouslySetInnerHTML={{ __html: previewContent }} />
    
    </div>
   
      
    </NavLink>
    {isShown && 
    <Button onClick={deleteHandler} className='btn btn-danger'>delete</Button>
}
    </>
    
  );
};

export default ReceivedEmail;
