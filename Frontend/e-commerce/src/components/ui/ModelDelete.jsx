import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import useDelete from "../../hook/useDelete";
import useFetch from "../../hook/useFetch";
import {useNavigate } from "react-router-dom"


function ModelDelete({ handleClose, handleShow, show, data }) {
   const [url, setUrl] = useState(null)
   const [response, loading, error] = useDelete(url);
   console.log(loading)






  const handleOnDelete = () => {
    // Made handleOnDelete async
    setUrl(`http://127.0.0.1:8000/category-filter/${data?.id}/`)
    

    
  };

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
          <div className="btn-group gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button disabled={loading} onClick={handleOnDelete} className="btn btn-danger" >{loading ? '---------' : 'mm'}</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelDelete;
