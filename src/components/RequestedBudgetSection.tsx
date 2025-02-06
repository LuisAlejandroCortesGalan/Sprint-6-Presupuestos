const RequestedBudgetSection = () => {
  return (
    <div className="d-flex gap-4 flex-column align-items-center w-100">
      <div className="d-flex justify-content-center w-100 flex-row align-items-center">
        <div className="card border-0 d-flex flex-row justify-content-between">
          <h3>Presupuestos en curso</h3>
          <div className=" d-flex flex-row gap-3 mt-5">
           <i className="fas fa-search"></i>
            <a href=""><p>Fecha</p></a>
            <a href=""><p>Importe</p></a>
            <a href=""><p>Nombre</p></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedBudgetSection;
