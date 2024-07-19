import { useState } from "react";
import Spinner from "../../components/Spinner";
import Table from "../../components/ui/Table";
import useFetch from "../../hook/useFetch";
import AddNewCategoryModal from "../../components/ui/AddNewCategoryModal";
import AlertMessage from "../../components/ui/Alert";

const Category = () => {
  const [refresh, setRefresh] = useState(0)
  const [data, pending, error] = useFetch("http://127.0.0.1:8000/category-list/", refresh);
  const [show, setShow] = useState(false);
  const [alert , setAlert] = useState(false)


  const  handleAlert = () => {
    setAlert(true)
  }
  const handleOnChangeUrl = () =>{
    setRefresh(refresh+1)
  }
  const handleCloseAdd = () => setShow(false);

  const handleAddClick = () => {
    setShow(true)
  }
  return (
    <>
      <h1>Category</h1>
      {error && (
        <>
          <div className="div">
            <h2 className="text-danger text-center">{error.message}</h2>
          </div>
        </>
      )}
      {pending && <Spinner />}
      <div className="row justify-content-end">
            <div className="col-2">
               <button onClick={handleAddClick} className="btn btn-primary m-2">Add Category</button>
            </div>
      </div>
      {alert && <AlertMessage message="Hello User 😀, Successfully Added!" />}
      {data && <Table handleOnChangeUrl={handleOnChangeUrl}  data={data} />}
      <AddNewCategoryModal handleOnChangeUrl={handleOnChangeUrl} show={show} handleCloseAdd={handleCloseAdd} showAlert={handleAlert}/>
      
    </>
  );
};

export default Category;
