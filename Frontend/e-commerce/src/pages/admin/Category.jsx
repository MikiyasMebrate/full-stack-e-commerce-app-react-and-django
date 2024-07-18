import { useState } from "react";
import Spinner from "../../components/Spinner";
import Table from "../../components/ui/Table";
import useFetch from "../../hook/useFetch";

const Category = () => {
  const [refresh, setRefresh] = useState(0)
  const [data, pending, error] = useFetch("http://127.0.0.1:8000/category-list/", refresh);

  const handleOnChangeUrl = () =>{
    setRefresh(refresh+1)
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
      {data && <Table handleOnChangeUrl={handleOnChangeUrl}  data={data} />}
    </>
  );
};

export default Category;
