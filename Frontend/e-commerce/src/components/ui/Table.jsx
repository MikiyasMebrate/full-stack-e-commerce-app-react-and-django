import dateFormatter from  '../../utility/dateFormatter.js'
import ModelDelete from './ModelDelete.jsx';
import { useState } from 'react';
import AlertMessage from './Alert.jsx';
import EditModal from './ModalEdit.jsx';

const Table = ({data,handleOnChangeUrl}) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    

    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showEdit, setShowEdit] = useState(false);
    const [showAlertEdit, setShowAlertEdit] = useState(false);
    


    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const handleOnClick = (data) =>{
        setSelectedItem(data)
        handleShow()
    }

    const handleOnClickEdit = (data) =>{
      setSelectedItem(data)
      handleShowEdit()
  }

    const handleAlert = ()=>{
      setShowAlert(true)
    }

    const handleAlertEdit = ()=>{
      setShowAlertEdit(true)
    }



    let table = data.categories.map((list, index) => (
        <tr key={list.id}>
        <th scope="row">{index + 1}</th>
        <td>{list.name}</td>
        <td>{list.description}</td>
        <td>{dateFormatter(list.created_at)}</td>
        <td> 
            <div className="btn-group gap-2">
            <button className='btn btn-warning m-2' onClick={() => handleOnClickEdit(list)}>Edit</button> 
            <button className='btn btn-danger m-2' onClick={() => handleOnClick(list)}>Delete</button>
            </div>
          
        </td>
      </tr>
    ))
  return (
    <>
   {showAlert && <AlertMessage message="Hello User 😀, Successfully Delete!" />}
   {showAlertEdit && <AlertMessage message="Hello User 😀, Successfully Updated!" />}
    <div className=" table-responsive">
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {table}
        </tbody>
      </table>
      </div>

      <ModelDelete handleOnChangeUrl={handleOnChangeUrl} data={selectedItem} handleClose={handleClose} handleAlert={handleAlert}  show={show} />
      <EditModal handleOnChangeUrl={handleOnChangeUrl} data={selectedItem} handleClose={handleCloseEdit} handleAlert={handleAlertEdit} show={showEdit} /> 
    </>
  );
};

export default Table;
