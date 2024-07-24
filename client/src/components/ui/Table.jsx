const Table = ({data, header, handleModalShow}) => {
  const headers = header.map((item) =>(
    <th key={item} scope="col">{item}</th>
  ))
  
  return (
    <>
      <div className="card">
        <div className="card-body">
        <div className="text-right">
            <button onClick={handleModalShow} className="btn btn-primary float-end">Add</button>
            </div>
        <div className="table-responsive pt-3">
        <table className="table caption-top table-sm table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              {headers}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </>
  );
};

export default Table;
