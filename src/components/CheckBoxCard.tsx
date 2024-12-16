import { useState, useEffect, useCallback } from "react";

type Props = {
  id: number;
  title: string;
  price: number;
  text: string;
  handleCheckboxChange: (cardId: number, price: number) => void;
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
}: Props) => {
  const [pages, setPages] = useState<number>(0);
  const [languages, setLanguages] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false); // Corregido aquí

  // Función para incrementar el valor
  const increment = (
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setter((prev) => prev + 1);
  };

  // Función para decrementar el valor
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => (prev > 0 ? prev - 1 : 0));
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

    updateTotalPriceDirectly(difference); // Actualiza el precio total
    setPreviousTotal(newTotal); // Guarda el nuevo total
  }, [pages, languages, previousTotal, updateTotalPriceDirectly]);

  useEffect(() => {
    updatePrice();
  }, [updatePrice]);

  const handleCheckboxChangeWithReset = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;
      if (!newChecked) {
        setPages(0);      // Resetear páginas
        setLanguages(0);  // Resetear lenguajes
      }
      return newChecked;
    });
    handleCheckboxChange(id, price); // Llamar a la función original para manejar el cambio
  };

  return (
    <div className="card shadow-lg">
      <div className="card-body d-flex flex-row gap-5 align-items-center justify-content-center">
        <div className="text-start">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
        <div className="d-flex">
          <p className="fw-bolder fs-3">{price}</p>
          <span> €</span>
        </div>
        <div className="d-flex gap-2">
          <input
            type="checkbox"
            checked={checked} // Aseguramos que el checkbox mantenga el estado
            onChange={handleCheckboxChangeWithReset} // Usamos la función con reset
          />
          <label>Agregar</label>
        </div>
      </div>

      {/* Verificar que el título sea "WEB" y si hasWeb es true */}
      {title === "WEB" && hasWeb && (
        <div className="d-flex flex-column gap-3 p-3">
          {/* Aquí agregamos los controles para el número de páginas */}
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <p>Número de páginas</p>
            <button
              className="btnNumber"
              onClick={() => decrement(setPages)}
            >
              -
            </button>
            <input
              type="number"
              name="pages"
              id="pages"
              className="inputNumber text-center"
              value={pages}
              readOnly
            />
            <button
              className="btnNumber"
              onClick={() => increment(setPages)}
            >
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
              name="languages"
              id="languages"
              className="inputNumber text-center"
              value={languages}
              readOnly
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