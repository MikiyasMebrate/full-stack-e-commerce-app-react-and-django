import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ToastMessage() {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
      <Toast
        bg="success"
        onClose={() => setShow(false)}
        show={show}
        delay={4000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
