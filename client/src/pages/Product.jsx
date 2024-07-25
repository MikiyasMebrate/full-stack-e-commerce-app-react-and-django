import { useSelector, useDispatch } from "react-redux";
import { fetchTableData, addTableDataRequest, updateTableDataRequest ,selectItem } from "../state/tableData/tableDataSlice";
import { useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import formattedDate from "../utility/dateFormatter";

//form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//components
import AlertMessage from "../components/ui/AlertMessage";
import ModalDelete from "../components/ui/ModalDelete";
import ModalAddUpdate from "../components/ui/ModalAddUpdate";
import Table from "../components/ui/Table";
import useFetch from "../hook/useFetch";

const schema = yup.object().shape({
  name: yup.string().min(3).required("Name is required"),
  category: yup.string().required("category is required"),
  summary: yup.string().min(3).required("summary is required"),
  description: yup.string().min(3).required("summary is required"),
  price: yup.number("Enter valid Price").required("Price is required"),
  cover: yup.mixed().test("file", "You need to provide a file", (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  }),
  is_active: yup.boolean()
});

const Product = () => {
  //redux
  const tableData = useSelector((state) => state.tableData.data);
  const tableDataLoading = useSelector((state) => state.tableData.loading);
  const tableDataError = useSelector((state) => state.tableData.error);
  const tableDataSelectedItem = useSelector(
    (state) => state.tableData.selectedItem
  );
  const dispatch = useDispatch();

  //url
  const productUrl = "http://127.0.0.1:8000/product-list/";

  useEffect(() => {
    dispatch(fetchTableData(productUrl));
  }, [productUrl]);

  //category lists
  const [categoryData, categoryLoading, categoryError] = useFetch(
    "http://127.0.0.1:8000/category-list/"
  );


  //form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });






  //handle alert message
  const [showAlertMessage, setShowAlertMessage] = useState(false);


  //response messages
  const [responseMessage, setResponseMessage] = useState([])

//modal handler
  const [handler, setHandler] = useState({
    deleteModalShow: false,
    addModalShow: false,
    editModalShow: false,
  });

  const handleAddModalShow = () => {
    reset()
    setHandler({ ...handler, addModalShow: !handler.addModalShow });
  };

  const handleDeleteModalShow = () => {
    setHandler({ ...handler, deleteModalShow: !handler.deleteModalShow });
  };

  const handleUpdateModalShow = () => {
    setHandler({ ...handler, editModalShow: !handler.editModalShow });
  };



    //handle form after submit
    const handleOnSubmit = async (data) => {
        try{
            const response = handler.addModalShow ? await dispatch(addTableDataRequest(productUrl,data)) : await dispatch(updateTableDataRequest(`http://127.0.0.1:8000/product-filter/${tableDataSelectedItem.id}/`, data));
            handler.addModalShow ? handleAddModalShow() : handleUpdateModalShow()

            reset()
            setShowAlertMessage(true)
            setResponseMessage(response)
        
        }catch(err){
            console.log(err)
        }
      };


        //handle on edit button Clicked
  const handleEdit = (item) => {
    setValue("name",item.name)
    setValue("category",item.category_id)
    setValue("summary",item.summary)
    setValue("description",item.description)
    setValue("price",item.price)
    setValue("is_active", item.is_active)
    setValue("cover", `127.0.0.1:8000/media/${item.cover}`)
    dispatch(selectItem(item))

    handleUpdateModalShow()
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
         
          <h5>List of Product</h5>
          {tableData && !tableDataLoading && (
            <Table
              handleModalShow={handleAddModalShow}
              header={[
                "Name",
                "category",
                "summary",
                "price",
                "cover",
                "created_at",
              ]}
              data={tableData?.product?.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category__name}</td>
                  <td>{product.summary}</td>
                  <td>{product.price}</td>
                  <td>
                    <img
                      style={{ width: "70px" }}
                      className="img-fluid"
                      src={`http://127.0.0.1:8000/media/${product.cover}`}
                      alt=""
                    />
                  </td>
                  <td>{formattedDate(product.created_at)}</td>
                  <td>
                    <div className="btn-group btn-group-sm gap-3">
                      <button className="btn btn-primary">View</button>
                      <button onClick={()=>handleEdit(product)} className="btn btn-warning">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            />
          )}
        </div>

        {/** Modal */}
        <ModalAddUpdate
          show={
            handler.addModalShow ? handler.addModalShow : handler.editModalShow
          }
          handleModalShow={
            handler.addModalShow ? handleAddModalShow : handleUpdateModalShow
          }
          operation={handler.addModalShow ? "add" : "update"}
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
                <label htmlFor="formCategory" className="form-label">
                  Category
                </label>

                <select  {...register("category")} className="form-control" aria-label="Default select example">
                  {categoryData && !categoryLoading && categoryData?.data?.categories.map((item) =>(
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
                
                {errors.category && (
                  <p className="text-danger">{errors.category.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="formSummary" className="form-label">
                  Summary
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.summary ? "is-invalid" : ""
                  }`}
                  id="formSummary"
                  placeholder="Summary"
                  {...register("summary")}
                />
                {errors.summary && (
                  <p className="text-danger">{errors.summary.message}</p>
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
                  placeholder="descriptions"
                  {...register("description")}
                ></textarea>
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="formPrice" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  step="any"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  id="formPrice"
                  placeholder="price"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-danger">{errors.price.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="formCover" className="form-label">
                  Cover
                </label>
                <input
                  type="file"
                  className={`form-control ${errors.cover ? "is-invalid" : ""}`}
                  id="formCover"
                  placeholder="Category Name"
                  {...register("cover")}
                />
                {errors.cover && (
                  <p className="text-danger">{errors.cover.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="formActive" className="form-label">
                  Is Active
                </label>
                <input
                  type="checkbox"
                  className={`form-check ${errors.cover ? "is-invalid" : ""}`}
                  id="formActive"
                  placeholder="Category Name"
                  {...register("is_active")}
                />
                {errors.is_active && (
                  <p className="text-danger">{errors.is_active.message}</p>
                )}
              </div>
            </>
          }
        />
      </div>
    </>
  );
};

export default Product;
