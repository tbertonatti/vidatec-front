import React, { useState } from "react";
import { Button, Form, ListGroup, Spinner } from "react-bootstrap";
import MessageNotification from "../../models/message";
import { TODO } from "../../models/todo";
import { CreateTodo } from "../../services/todos";

type PropsTODOCreator = {
  createTodo: (t: TODO) => void;
  displayMessage: (m: MessageNotification) => void;
};
const TODOCreator = ({ createTodo, displayMessage }: PropsTODOCreator) => {
  const [input, setInput] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setInput(value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const createdSuccessMessage: MessageNotification = {
      type: "success",
      text: "TODO created",
    };
    const createdErrorMessage: MessageNotification = {
      type: "error",
      text: "Failed to create TODO",
    };
    setSaving(true);
    try {
      const res = await CreateTodo(input);
      setInput("");
      createTodo(res);
      displayMessage(createdSuccessMessage);
    } catch (err) {
      createdErrorMessage.text = String(err).includes("400")
        ? "An already created TODO has the same content"
        : "Failed to create TODO";
      displayMessage(createdErrorMessage);
    }
    setSaving(false);
  };
  return (
    <ListGroup.Item>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="TODOCreatorContent">
          <div
            className="align-items-center justify-content-between"
            style={{ display: "flex" }}
          >
            <Form.Label>New TODO :</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={input}
              disabled={saving}
              type="text"
              placeholder="create a new TODO..."
            />
            <Button
              disabled={saving || !input.length}
              variant="primary"
              style={{ marginLeft: "10px" }}
              type="submit"
            >
              +
              {saving && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </ListGroup.Item>
  );
};

export default TODOCreator;
