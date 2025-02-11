import { useState, useMemo, useCallback, useEffect } from "react";

type Props = {
  promoIsActive: boolean; 
  id: number; 
  title: string;
  price: number;
  text: string;
  handleCheckboxChange: (
    price: number,
    isSelected: boolean,
    card: {
      id: number;
      title: string;
      price: number;
      text: string;
      pages: number | undefined; //
      languages: number | undefined;
    }
  ) => void;
  updateCard: (card: {
    id: number;
    title: string;
    price: number;
    text: string;
    pages: number | undefined;
    languages: number | undefined;
  }) => void;
};

export const CheckBoxCard = ({
  promoIsActive,
  id,
  title,
  price,
  text,
  handleCheckboxChange,
  updateCard,
}: Props) => {
  const [pages, setPages] = useState<number>(0);
  const [languages, setLanguages] = useState<number>(0);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  let basePrice = price;

  basePrice = promoIsActive ? basePrice * 0.80 : basePrice;

  // Calcular el precio total dinámicamente
  const totalReal = useMemo(() => {
    return basePrice + (pages + languages) * 30;
  }, [basePrice, pages, languages]);

  // Al cambiar el checkbox, notificar al padre
  const onCheckboxChange = useCallback(() => {
    const newSelected = !isSelected;
    setIsSelected(newSelected);
    handleCheckboxChange(totalReal, newSelected, {
      id,
      title,
      price: totalReal,
      text,
      pages,
      languages,
    });
  }, [
    isSelected,
    totalReal,
    id,
    title,
    text,
    pages,
    languages,
    handleCheckboxChange,
  ]);

  // Cuando se modifican páginas o lenguajes y la tarjeta está seleccionada, actualizar la tarjeta en el padre
  useEffect(() => {
    if (isSelected) {
      updateCard({
        id,
        title,
        price: totalReal,
        text,
        pages,
        languages,
      });
    }
  }, [pages, languages, totalReal, isSelected, id, title, text, updateCard]);

  // Actualizar valores de páginas o lenguajes
  const updateValue = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<number>>,
      field: "pages" | "languages",
      increment: boolean
    ) => {
      setter((prev) => {
        const newValue = increment ? prev + 1 : prev - 1;
        return Math.max(0, newValue);
      });
    },
    []
  );

  return (
    <div className={`card shadow-lg ${isSelected ? "card-selected" : ""}`}>
      <div className="card-body d-flex flex-row gap-5 align-items-center justify-content-center">
        <div className="text-start">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
        <p className="promo">{promoIsActive ? "Ahorra un 20%" : "" }
        </p>
        <div className="d-flex">
          <p className="fw-bolder fs-3">{totalReal}</p>
          <span> €</span>
        </div>
        <div className="d-flex gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onCheckboxChange} // Solo se llama cuando el usuario cambia la selección
          />
          <label>Agregar</label>
        </div>
      </div>

      {isSelected && (
        <div className="d-flex flex-column gap-3 p-3">
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <p>Número de páginas</p>
            <button
              type="button"
              className="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="fas fa-info"></i>
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Número de páginas
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Cerrar"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Agrega el numero de paginas que tendra tu proyecto. El
                    costo de cada paginas es de 30€.
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btnNumber"
              onClick={() => updateValue(setPages, "pages", false)}
              disabled={pages === 0}
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
              onClick={() => updateValue(setPages, "pages", true)}
            >
              +
            </button>
          </div>
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <p>Número de Lenguajes</p>
            <button
              type="button"
              className="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              <i className="fas fa-info"></i>
            </button>

            <div
              className="modal fade"
              id="exampleModal1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Número de lenguages
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Cerrar"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Agrega el numero de Lenguages que tendra tu proyecto. El costo
                    de cada Lenguage es de 30€.
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btnNumber"
              onClick={() => updateValue(setLanguages, "languages", false)}
              disabled={languages === 0}
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
              onClick={() => updateValue(setLanguages, "languages", true)}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
