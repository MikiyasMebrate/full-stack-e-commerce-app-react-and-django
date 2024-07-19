import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function EditModal({ handleOnChangeUrl, handleClose, show, data, handleAlert }) {
  const scheme = yup.object({
    name: yup.string().required("Name is required!").min(3),
    description: yup.string().required().min(10),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue, 
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/category-filter/${data?.id}/`, formData);
      console.log(response);
      handleClose();
      handleOnChangeUrl();
      handleAlert();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (show && data) {
      setValue("name", data?.name); 
      setValue("description", data?.description); 
    }
  }, [show, data, setValue]);

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control border ${errors.name ? "is-invalid" : ""}`}
                {...register("name")}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Description
              </label>
              <textarea
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                rows="3"
                {...register("description")}
              ></textarea>
              {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-group gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <button type="submit" disabled={isSubmitting} className="btn btn-danger">
                {isSubmitting ? "Loading" : "Update"}
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;