import dateFormatter from  '../../utility/dateFormatter.js'
import ModelDelete from './ModelDelete.jsx';
import { useState } from 'react';

const Table = ({data}) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOnClick = (data) =>{
        setSelectedItem(data)
        handleShow()
    }

    let table = data.categories.map((list, index) => (
        <tr key={list.id}>
        <th scope="row">{index + 1}</th>
        <td>{list.name}</td>
        <td>{list.description}</td>
        <td>{dateFormatter(list.created_at)}</td>
        <td> 
            <div className="btn-group gap-2">
            <button className='btn btn-warning m-2'>Edit</button> 
            <button className='btn btn-danger m-2' onClick={() => handleOnClick(list)}>Delete</button>
            </div>
          
        </td>
      </tr>
    ))
  return (
    <>
    <div className="table-responsive">
      <table className="table table-hover ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {table}
        </tbody>
      </table>
      </div>

      <ModelDelete data={selectedItem} handleClose={handleClose} handleShow={handleShow} show={show} />
    </>
  );
};

export default Table;
