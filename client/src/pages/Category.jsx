import { useSelector, useDispatch } from "react-redux";
import {
  fetchTableData,
  addTableDataRequest,
  selectItem,
  updateTableDataRequest,
  deleteTableDataRequest,
} from "../state/tableData/tableDataSlice";
import { useEffect, useState } from "react";

import formattedDate from "../utility/dateFormatter";

//components
import ModalAddUpdate from "../components/ui/ModalAddUpdate";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";

//form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertMessage from "../components/ui/AlertMessage";
import ModalDelete from "../components/ui/ModalDelete";

const schema = yup.object().shape({
  name: yup.string().min(3).required("Name is required"),
  description: yup.string().min(3).required("Name is required"),
});

const Category = () => {
  //redux tableData
  const tableData = useSelector((state) => state.tableData.data);
  const tableDataLoading = useSelector((state) => state.tableData.loading);
  const tableDataError = useSelector((state) => state.tableData.error);
  const tableDataSelectedItem = useSelector(
    (state) => state.tableData.selectedItem
  );

  const dispatch = useDispatch();

  //url
  const urlCategory = "http://127.0.0.1:8000/category-list/";

  //fetch data for the first time
  useEffect(() => {
    dispatch(fetchTableData(urlCategory));
  }, [urlCategory]);

  //form update and add
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //form delete
  const {
    handleSubmit : handleDeleteSubmit,
    formState : {isSubmitting : isDeleteFormSubmitting}
  } = useForm()

  //handle modal
  const [showModal, setShowModal] = useState({
    deleteModalShow: false,
    addModalShow: false,
    editModalShow: false,
  });

  const handleAddModalShow = () => {
    reset()
    setShowModal({ ...showModal, addModalShow: !showModal.addModalShow });
  };

  const handleDeleteModalShow = () => {
    
    setShowModal({ ...showModal, deleteModalShow: !showModal.deleteModalShow });
  };

  const handleUpdateModalShow = () => {
    setShowModal({ ...showModal, editModalShow: !showModal.editModalShow });
  };



  //handle alert message
  const [showAlertMessage, setShowAlertMessage] = useState(false);


  //response messages
  const [responseMessage, setResponseMessage] = useState([])

  

  //handle on edit button Clicked
  const handleEdit = (item) => {
    setValue("name",item.name)
    setValue("description",item.description)
    dispatch(selectItem(item))
    handleUpdateModalShow()
  }

  const handleDelete = (item) =>{
    dispatch(selectItem(item))
    handleDeleteModalShow()
  }

  //handle form after submit
  const handleOnSubmit = async (data) => {
    try {      
      const response = showModal.addModalShow ? await dispatch(addTableDataRequest(urlCategory, data)) : await dispatch(updateTableDataRequest(`http://127.0.0.1:8000/category-filter/${tableDataSelectedItem.id}/`, data));
      reset();
      showModal.addModalShow ? handleAddModalShow() : handleUpdateModalShow()
      setShowAlertMessage(true)
      setResponseMessage(response)
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDeleteSubmit = async()=>{
    try{
      const response =  await dispatch(deleteTableDataRequest(`http://127.0.0.1:8000/category-filter/${tableDataSelectedItem.id}/`));
      handleDeleteModalShow()
      setResponseMessage(response)
      setShowAlertMessage(true)
      
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      {tableDataLoading && <Spinner />}

      <div className="row justify-content-center">
        <div className="col-md-11">
          {/** Alert */}
          <AlertMessage
            show={showAlertMessage}
            handleShowAlertMessage={setShowAlertMessage}
            message={responseMessage}
          />
          <h5>List of category</h5>
          {tableData && !tableDataError && (
            <Table
              handleModalShow={handleAddModalShow}
              header={["Name", "Description", "Created at"]}
              data={tableData?.categories?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{formattedDate(item.created_at)}</td>
                  <td>
                    <div className="btn-group btn-group-sm gap-2">
                      <button onClick={()=>handleEdit(item)} className="btn btn-warning">Edit</button>
                      <button onClick={()=>handleDelete(item)} className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
             
            />
          )}
        </div>

        {/** Modal */}
        <ModalAddUpdate
          show={showModal.addModalShow ? showModal.addModalShow : showModal.editModalShow}
          handleModalShow={showModal.addModalShow ? handleAddModalShow : handleUpdateModalShow}
          operation = {showModal.addModalShow ? 'add' : 'update'}
          handleOnSubmit={handleOnSubmit}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          form={
            <>
              <div className="mb-3">
                <label htmlFor="formName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="formName"
                  placeholder="Category Name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="formDescription" className="form-label">
                  Description
                </label>
                <textarea
                  name=""
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  id="formDescription"
                  cols="30"
                  rows="10"
                  {...register("description")}
                ></textarea>
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
                )}
              </div>
            </>
          }
        />

        <ModalDelete 
        show={showModal.deleteModalShow} 
        handleModalShow={handleDeleteModalShow} 
        data={tableDataSelectedItem?.name}
        handleDeleteSubmit={handleDeleteSubmit}
        isSubmitting = {isDeleteFormSubmitting}
        handleOnDeleteSubmit = {handleOnDeleteSubmit}
        />
      </div>
    </>
  );
};

export default Category;
