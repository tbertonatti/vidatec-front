import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import MessageNotification from "../../models/message";
import { TODO } from "../../models/todo";
import { CompleteTodo, DeleteTodo } from "../../services/todos";

type PropsTODOElement = {
  todo: TODO;
  deleteTodo: (id: number) => void;
  updateTodo: (t: TODO) => void;
  displayMessage: (m: MessageNotification) => void;
};
function TODOElement({
  todo,
  deleteTodo,
  updateTodo,
  displayMessage,
}: PropsTODOElement) {
  const [updating, setUpdating] = useState<boolean>(false);
  const { id } = todo;
  const completeTodo = async () => {
    const completedSuccessMessage: MessageNotification = {
      type: "success",
      text: "TODO marked as done",
    };
    const completedErrorMessage: MessageNotification = {
      type: "error",
      text: "Failed to mark TODO as done",
    };
    setUpdating(true);
    try {
      await CompleteTodo(id);
      displayMessage(completedSuccessMessage);
      updateTodo({ ...todo, completed: true });
    } catch (err) {
      displayMessage(completedErrorMessage);
    }
    setUpdating(false);
  };
  const deleteT = async () => {
    const deletedSuccessMessage: MessageNotification = {
      type: "success",
      text: "TODO deleted",
    };
    const deletedErrorMessage: MessageNotification = {
      type: "error",
      text: "Failed to delete TODO",
    };
    setUpdating(true);
    try {
      await DeleteTodo(id);
      displayMessage(deletedSuccessMessage);
      deleteTodo(id);
    } catch (err) {
      displayMessage(deletedErrorMessage);
      setUpdating(false);
    }
  };
  return (
    <ListGroup.Item>
      <div
        className="align-items-center justify-content-between"
        style={{ display: "flex" }}
      >
        <span
          style={{
            fontStyle: "italic",
            overflow: "auto",
            textDecoration: todo.completed ? "line-through" : "inherit",
          }}
        >
          {todo.content}
        </span>
        <div
          className="align-items-center justify-content-around"
          style={{ display: "flex", minWidth: "100px" }}
        >
          {!todo.completed && (
            <Button
              variant="success"
              disabled={updating}
              title="Mark as done"
              size="sm"
              onClick={() => completeTodo()}
            >
              ✓
            </Button>
          )}
          <Button
            variant="danger"
            disabled={updating}
            title="Delete"
            size="sm"
            onClick={() => deleteT()}
          >
            ⌫
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default TODOElement;
