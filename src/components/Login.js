import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { authActions } from "../store/auth-slice";
import {  useDispatch } from "react-redux";

const Login = () => {

  const navigate = useNavigate();

  const dispatch =  useDispatch();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      var response = await axios({
        method: "post",
        url: "http://localhost:5000/login",
        data: {
          email: email,
          password: password,
        },
      });

      if (response) {
        const token = response.data.id;
        dispatch(authActions.login(token));
        navigate("/");

      }
    } catch (err) {
      alert(err.response.data);
    }
  };

  
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center flex-column"
    >
      <Card style={{ width: "350px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block="true" className="mt-3">
              Login
            </Button>

            <Row>
              <Col className="text-center">
                <NavLink to="/forgotpassword"  style={{textDecoration:"none" , fontWeight:"bold"}} >Forgot Password?</NavLink>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <div className="mt-3 text-center" style={{ width: "350px" }}>
        <NavLink
          to="/signup"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button 
            className="btn-secondary"
           
            style={{ width: "100%"}}
          >
            Doesn't have an account ? Sign Up
          </Button>
        </NavLink>
      </div>
    </Container>
  );
};

export default Login;
