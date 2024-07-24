import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAddUpdate({show, handleModalShow, form, handleOnSubmit, handleSubmit, isSubmitting, operation}) {
  return (
    <>
      <Modal size='lg' show={show} onHide={handleModalShow}>
        <Modal.Header>
          <Modal.Title>{`${operation == 'add' ? 'Add' : 'Update'}`}</Modal.Title>
        </Modal.Header>
       <form onSubmit={handleSubmit(handleOnSubmit)}>
       <Modal.Body>
          {form}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalShow}>
            Close
          </Button>
          <Button disabled={isSubmitting} type='submit' variant="primary">
            {isSubmitting ? 'Submitting' : `${operation == 'add' ? 'Add' : 'Update' }`}
          </Button>
        </Modal.Footer>
       </form>
      </Modal>
    </>
  );
}

export default ModalAddUpdate;