import React from "react";
import { Card } from "react-bootstrap";
import MessageNotification from "../../models/message";
import TODOList from "../TODO/TODOList";

type PropsHomeLayout = {
  displayMessage: (m: MessageNotification) => void;
};
const HomeLayout = ({ displayMessage }: PropsHomeLayout) => (
  <Card>
    <Card.Header as="h2">Home</Card.Header>
    <Card.Body
      className="align-items-center justify-content-center"
      style={{ display: "flex" }}
    >
      <TODOList displayMessage={displayMessage} />
    </Card.Body>
  </Card>
);

export default HomeLayout;
