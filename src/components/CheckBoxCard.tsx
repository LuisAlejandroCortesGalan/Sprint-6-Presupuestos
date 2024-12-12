type props = {
    id: number,
    title: string,
    price: number,
    text: string,
    handleCheckboxChange: (cardId: number) => void,
}

export const CheckBoxCard = ({ title, price, text, id, handleCheckboxChange }: props) => {
    return (
      <div className="d-flex card shadow-lg">
        <div className="d-flex card-body flex-row gap-5 align-items-center justify-content-center">
          <div className="text-start">
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
          <div className="d-flex">
          <p className="fw-bolder fs-3">{price} </p><span> €</span>
          </div>
          <div className="d-flex gap-2">
            <input type="checkbox"
                  onChange={() =>handleCheckboxChange(id)}
            />
            <label> Agregar</label>
          </div>
        </div>
      </div>
    );
  }; 