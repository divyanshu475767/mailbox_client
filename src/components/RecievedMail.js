import React from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import './ReceivedEmail.css';

const ReceivedEmail = ({ sender, subject, content }) => {
  // Function to sanitize HTML content and extract text for preview
  const sanitizeAndPreview = (html) => {
    const sanitizedHTML = DOMPurify.sanitize(html); // Sanitize the HTML content
    const strippedText = sanitizedHTML.replace(/(<([^>]+)>)/gi, ''); // Extract text without HTML tags
    return strippedText.length > 100 ? `${strippedText.substring(0, 100)}...` : strippedText;
  };

  const previewContent = sanitizeAndPreview(content);

  return (
    <div className="email">
      <div className="sender">{sender}</div>
      <div className="subject">{subject}</div>
      <div className="content" dangerouslySetInnerHTML={{ __html: previewContent }} />
    </div>
  );
};

export default ReceivedEmail;
