import React from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import './ReceivedEmail.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
const ReceivedEmail = ({id, sender, subject, content,isRead }) => {

   const token = useSelector(state=>state.auth.token);

  // Function to sanitize HTML content and extract text for preview
  const sanitizeAndPreview = (html) => {
    const sanitizedHTML = DOMPurify.sanitize(html); // Sanitize the HTML content
    const strippedText = sanitizedHTML.replace(/(<([^>]+)>)/gi, ''); // Extract text without HTML tags
    return strippedText.length > 100 ? `${strippedText.substring(0, 100)}...` : strippedText;
  };

  const previewContent = sanitizeAndPreview(content);


  const updateStatusHandler =async ()=>{
    const response = await axios({
      method: "put",
      url: "http://localhost:5000/updateReadStatus",
      data: {mailId:id},
      headers:{Authorization:token}
    });

    console.log(response.data);

    alert(response.data);
  }
  return (
    <NavLink to={`mail/${id}`} style={{textDecoration:"none"}}>
    
    <div className="email" onClick={updateStatusHandler}>
    {!isRead && <span className='isRead'></span>}
    
      <div className="sender">{sender}</div>
      <div className="subjectMinor">{subject}</div>
      <div className="content" dangerouslySetInnerHTML={{ __html: previewContent }} />
    </div>
    </NavLink>
  );
};

export default ReceivedEmail;
