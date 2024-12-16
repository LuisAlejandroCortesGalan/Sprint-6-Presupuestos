import { useState, useEffect, useCallback } from "react";

type props = {
  id: number;
  title: string;
  price: number;
  text: string;
  handleCheckboxChange: (cardId: number, price:number) => void;
  hasWeb: boolean;
  updateTotalPriceDirectly: (amount: number) => void;
};

export const CheckBoxCard = ({
  title,
  price,
  text,
  id,
  handleCheckboxChange,
  hasWeb,
  updateTotalPriceDirectly,
}: props) => {
  const [pages, setPages] = useState<number>(0);
  const [languages, setLanguages] = useState<number>(0);
  // Función para incrementar el valor
  const increment = (
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setter((prev) => {
      const newValue = prev + 1;
      return newValue;
    });
  };

  // Función para decrementar el valor
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => {
      const newValue = prev > 0 ? prev - 1 : 0;
      return newValue;
    });
  };

  // Función para actualizar el precio
  const [previousTotal, setPreviousTotal] = useState<number>(0);

  const updatePrice = useCallback(() => {
    const newTotal = (pages + languages) * 30;
    const difference = newTotal - previousTotal;
  
    console.log("Número de páginas:", pages);
    console.log("Número de lenguajes:", languages);
    console.log("Precio anterior:", previousTotal);
    console.log("Nuevo precio total:", newTotal);
    console.log("Diferencia:", difference);
  
    updateTotalPriceDirectly(difference);  // Actualiza el precio total
    setPreviousTotal(newTotal);            // Guarda el nuevo total
  }, [pages, languages, previousTotal, updateTotalPriceDirectly]);


  useEffect(() => {
    updatePrice();
  }, [updatePrice]);

  return (
    <div className="d-flex card shadow-lg">
      <div className="d-flex card-body flex-row gap-5 align-items-center justify-content-center">
        <div className="text-start">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
        <div className="d-flex">
          <p className="fw-bolder fs-3">{price} </p>
          <span> €</span>
        </div>
        <div className="d-flex gap-2">
          <input type="checkbox" onChange={() => handleCheckboxChange(id, price)} />
          <label> Agregar</label>
        </div>
      </div>

      {/* Verificar que el título sea "WEB" y si hasWeb es true */}
      {title === "WEB" && hasWeb && (
        <div className="d-flex flex-column gap-3 p-3">
          {/* Aquí podemos agregar los controles para el número de páginas */}
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <p>Número de páginas</p>
            <button className="btnNumber" onClick={() => decrement(setPages)}>
              -
            </button>
            <input
              type="number"
              name="pages"
              id="pages"
              className="inputNumber text-center"
              value={pages}
            />
            <button className="btnNumber" onClick={() => increment(setPages)}>
              +
            </button>
          </div>
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <p>Número de lenguajes</p>
            <button
              className="btnNumber"
              onClick={() => decrement(setLanguages)}
            >
              -
            </button>
            <input
              type="number"
              name="pages"
              id="languages"
              className="inputNumber text-center"
              value={languages}
            />
            <button
              className="btnNumber"
              onClick={() => increment(setLanguages)}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
