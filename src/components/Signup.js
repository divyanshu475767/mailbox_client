import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useMailAPI from "../custom_hooks/useMailAPI";
const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {signup} = useMailAPI();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =  await signup(name,email,password);

    console.log(response);

    if (response.success) {
      alert("welcome , lets login now");
      navigate('/login');
    } else {
      alert("OOPs , user already exists , please login");
    }
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form style={{ width: "300px" }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit" block="true">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
