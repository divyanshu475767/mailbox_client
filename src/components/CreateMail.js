import React, { useState } from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import "./CreateMail.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateMail = () => {
  const [content, setContent] = useState("");
  const [receiver, setReceiver] = useState("");
  const [title, setTitle] = useState("");

  const token = useSelector(state=>state.auth.token)

  const modules = {
    toolbar: [
      // You can customize the toolbar here if needed
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const receiverHandler = (event)=>{
    setReceiver(event.target.value);
  }

  const titleHandler = (event)=>{
    setTitle(event.target.value);
  }

  const sendHandler =async ()=>{
      const data = {
        receiver , title , content
      };

      var response = await axios({
        method: "post",
        url: "http://localhost:5000/sendMail",
        data: data,
        headers:{Authorization:token}
      });

      alert(response.data);
      
      setReceiver('');
      setContent('');
      setTitle('');

  }


  return (
    <div className="container">
      <h1 className="heading">Write a Mail</h1>
      <p className="top-para">
        <span>To</span>
        <span className="detail">
          <RiAccountPinCircleFill style={{ height: "20px", width: "20px" }} />
          <input type="text" className="cc"  onChange={receiverHandler} value={receiver}/>
        </span>
      </p>

      <hr />

      <input className="title" type="text" placeholder="Title" onChange={titleHandler} value={title}/>

      <ReactQuill
   
    style={{ height: "350px" ,  width: "70vw"  }} // Set the desired height here
        theme="snow"
        value={content}
        onChange={(value) => setContent(value)}
        modules={modules}
        formats={formats}
      />

      <Button variant="primary" size="sm" className="btn" onClick={sendHandler}>
        Send
      </Button>
    </div>
  );
};

export default CreateMail;


