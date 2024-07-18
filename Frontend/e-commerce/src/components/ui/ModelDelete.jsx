import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";

function ModelDelete({ handleOnChangeUrl, handleClose, show, data, handleAlert }) {


  const {handleSubmit, formState: { isSubmitting },} = useForm();


  const onSubmit = async ()=>{
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/category-filter/${data?.id}/`)
      .then(response =>{
        null
      })
      .then(err=>{
        console.log(err)
      })
      handleClose()
      handleOnChangeUrl()
      handleAlert()
    }catch(error){
      console.error('Error deleting category filter:', error);
    }
}


  return (
    <>
    
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <span className="text-danger fw-bold">{data?.name}</span>?
        </Modal.Body>
        <Modal.Footer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="btn-group gap-2">
            
           
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

            
              <button type="submit" disabled={isSubmitting} className="btn btn-danger">
              {isSubmitting ? 'Loading' : 'Delete'}
              </button>

              </div>
            </form>
          
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default ModelDelete;
