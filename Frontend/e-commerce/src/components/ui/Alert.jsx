import { useState } from "react";
import Alert from "react-bootstrap/Alert";


function AlertMessage({message}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <div className="p-3">
        <Alert.Heading>{message}</Alert.Heading>
        </div>
      </Alert>
    );
  }
}

export default AlertMessage;
