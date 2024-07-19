import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";




const scheme = yup.object({
  name: yup.string().required("Name is required!").min(3),
  description: yup.string().required().min(10),
});

const AddNewCategoryModal = ({ show, handleCloseAdd , handleOnChangeUrl , showAlert}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(scheme),
  });


  const handleOnSubmit=  async (data) =>{
    try{
        const response = await axios.post(`http://127.0.0.1:8000/category-list/`, data)
        .then(response =>{
          console.log(response)
        })
        .then(err=>{
          console.log(err)
        })
    }catch (err){
        console.log(err)
    }
    handleCloseAdd()
    handleOnChangeUrl()
    showAlert()
  }

  return (
    <>
      <Modal size="lg" show={show} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleOnSubmit)} >
        <Modal.Body>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                type="text"
                class={`form-control border  ${errors.name ? 'is-invalid' : ''} `}
                {...register("name")}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Description
              </label>
              <textarea
                class={`form-control ${errors.description ? 'is-invalid' : ''} `}
                rows="3"
                {...register("description")} 
              ></textarea>
               {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
            
         
        </Modal.Body>
        <Modal.Footer>
        <div className="btn-group">
                <button disabled={isSubmitting}  class="btn btn-primary float-end">
                    {isSubmitting ? "Loading" : "Submit"}
                </button>
            </div>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddNewCategoryModal;
