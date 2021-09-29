import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import MessageNotification from "../models/message";
import paths from "../routers/paths";
import { SetToken } from "../services/auth";
import { Login } from "../services/login";

type PropsLoginLayout = {
  displayMessage: (m: MessageNotification) => void;
};
const LoginForm = ({ displayMessage }: PropsLoginLayout) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const { username, password } = inputs;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (username && password) {
      const loginErrorMessage: MessageNotification = {
        type: "error",
        text: "Bad credentials",
      };
      const loginSuccessMessage: MessageNotification = {
        type: "success",
        text: "Logged in",
      };
      setLoggingIn(true);
      try {
        const res = await Login(username, password);
        SetToken(res.access_token);
        displayMessage(loginSuccessMessage);
        window.location.href = paths.home;
      } catch (err) {
        displayMessage(loginErrorMessage);
      }
      setLoggingIn(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="loginUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          name="username"
          onChange={handleChange}
          value={username}
          disabled={loggingIn}
          type="text"
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          name="password"
          onChange={handleChange}
          value={password}
          disabled={loggingIn}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button disabled={loggingIn} variant="primary" type="submit">
        Login
        {loggingIn && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Button>
    </Form>
  );
};

export default LoginForm;
