import React, { useEffect, useState } from "react";
import { Alert, Button, Card, ListGroup, Spinner } from "react-bootstrap";
import MessageNotification from "../../models/message";
import { TODO } from "../../models/todo";
import { GetTodos } from "../../services/todos";
import TODOCreator from "./TODOCreator";
import TODOElement from "./TODOElement";

type PropsTODOList = {
  displayMessage: (m: MessageNotification) => void;
};
const TODOList = ({ displayMessage }: PropsTODOList) => {
  const [todos, setTodos] = useState<TODO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const getTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await GetTodos();
      setTodos(res);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTodos();
  }, []);
  const deleteTodo = (idDelete: number) =>
    setTodos(todos.filter(({ id }) => id !== idDelete));
  const updateTodo = (todo: TODO) =>
    setTodos(todos.map((t: TODO) => (todo.id === t.id ? todo : t)));
  const createTodo = (todo: TODO) => setTodos(todos.concat(todo));
  const anyTodoCompleted = todos.some((t) => t.completed);
  const todoElements = todos.map((todo) => (
    <div
      key={todo.id}
      style={{ display: hideCompleted && todo.completed ? "none" : "block" }}
    >
      <TODOElement {...{ todo, deleteTodo, updateTodo, displayMessage }} />
    </div>
  ));
  return (
    <Card style={{ width: "85%", maxWidth: "800px", minWidth: "310px" }}>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {error && (
        <>
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>Failed to retrieve TODOs</p>
          </Alert>
          <Button variant="primary" type="submit" onClick={getTodos}>
            Try again
          </Button>
        </>
      )}
      {!(loading || error) && (
        <>
          <Card.Header
            className="align-items-center justify-content-between"
            style={{ display: "flex", fontSize: "25px" }}
          >
            TODOs:
            {anyTodoCompleted && (
              <Button
                type="submit"
                onClick={() => setHideCompleted(!hideCompleted)}
              >
                {hideCompleted ? "Show completed" : "Hide completed"}
              </Button>
            )}
          </Card.Header>
          <ListGroup
            style={{ maxHeight: "60vh", overflow: "auto" }}
            variant="flush"
          >
            {todoElements}
            <TODOCreator {...{ createTodo, displayMessage }} />
          </ListGroup>
        </>
      )}
    </Card>
  );
};

export default TODOList;
