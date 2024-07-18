const Spinner = () => {
  return (
    <div class="d-flex justify-content-center text-primary" >
      <div class="spinner-grow" style={{width : "5rem", height : "5rem"}} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
