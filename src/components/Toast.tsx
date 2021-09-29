import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import MessageNotification from "../models/message";

type PropsToastCustom = {
  message: MessageNotification;
  showMessage: boolean;
  setShowMessage: (b: boolean) => void;
};
const ToastCustom = ({
  message,
  showMessage,
  setShowMessage,
}: PropsToastCustom) => {
  let className: string = message.type === "error" ? "bg-danger" : "bg-success";
  className += " text-white";
  return (
    <>
      {showMessage && (
        <ToastContainer className="position-absolute p-3 bottom-0 end-0">
          <Toast
            onClose={() => setShowMessage(false)}
            show={showMessage}
            delay={3000}
            animation
            autohide
          >
            <Toast.Header className={className} closeVariant={"white"}>
              <strong className="me-auto">{message.type}</strong>
            </Toast.Header>
            <Toast.Body>{message.text}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default ToastCustom;
