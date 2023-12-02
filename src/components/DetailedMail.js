import React from 'react'
import { useParams } from 'react-router-dom';
import './DetailedMail.css';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization


const DetailedMail = () => {

    const params = useParams();

    const inbox = useSelector(state=>state.inbox.receivedMails);

    const sentMails = useSelector(state=>state.inbox.sentMails);

    const mailId= params.id;


  let  particular_mail = inbox.find(mail=>mail.id==mailId)

    if(!particular_mail){
      particular_mail=  sentMails.find(mail=>mail.id==mailId)
    }
    
    console.log(particular_mail);


    const sanitizeAndPreview = (html) => {
        const sanitizedHTML = DOMPurify.sanitize(html); // Sanitize the HTML content
        const strippedText = sanitizedHTML.replace(/(<([^>]+)>)/gi, ''); // Extract text without HTML tags
        return strippedText;
      };


      const previewContent = sanitizeAndPreview(particular_mail.content);

 
  
    return (
      <div className="detailed-email">
        <div className="header">
          
          <div className="subject">{particular_mail.title}</div>
          <div className="sender">by:  {particular_mail.senderName}</div>
        </div>
        <div className="content-inner" dangerouslySetInnerHTML={{ __html: previewContent }}/>
      </div>

  
  )
}

export default DetailedMail
