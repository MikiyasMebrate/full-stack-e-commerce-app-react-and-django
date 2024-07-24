import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({show, handleModalShow, data, isSubmitting, handleDeleteSubmit, handleOnDeleteSubmit}) => {
    return (
        <>
        <Modal size='lg' show={show} onHide={handleModalShow}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
       <form onSubmit={handleDeleteSubmit(handleOnDeleteSubmit)}>
       <Modal.Body>
          <p>Are sure you want to delete <span className='text-danger'>{data}</span>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalShow}>
            Close
          </Button>
          <Button disabled={isSubmitting} type='submit' variant="primary">
            {isSubmitting ? 'Submitting' : `Delete`}
          </Button>
        </Modal.Footer>
       </form>
      </Modal>
        </>
    );
}
 
export default ModalDelete;