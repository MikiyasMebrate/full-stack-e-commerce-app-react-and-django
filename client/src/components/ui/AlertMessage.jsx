import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AlertMessage = ({show, handleShowAlertMessage, message}) => {
    
    return (
        <>
        <Alert show={show} variant={`${message[0] ? 'success' : 'danger'}`}>
        <div className="text-right">
          <Button onClick={() => handleShowAlertMessage(false)} variant={`outline-${message[0] ? 'success' : 'danger'}`}>X</Button>
        </div>
        <p className='text-center'>{message[1] ? message[1] : '' }</p>
      </Alert>
        </>
    );
}
 
export default AlertMessage;