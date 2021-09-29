import React from "react";
import { Card } from "react-bootstrap";
import MessageNotification from "../../models/message";
import LoginForm from "../LoginForm";

type PropsLoginLayout = {
  displayMessage: (m: MessageNotification) => void;
};
const LoginLayout = ({ displayMessage }: PropsLoginLayout) => (
  <Card style={{ width: "85%", maxWidth: "800px" }}>
    <Card.Header as="h2">Login</Card.Header>
    <Card.Body>
      <LoginForm displayMessage={displayMessage} />
    </Card.Body>
  </Card>
);

export default LoginLayout;
