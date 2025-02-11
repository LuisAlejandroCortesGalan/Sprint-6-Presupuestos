import { useState } from "react";


interface Card {
  id: number;
  title: string;
  price: number;
  text: string;
  pages?: number;
  languages?: number;
}

interface RequestedBudgetSectionProps {
   reservations: {
    name: string;
    phone: string;
    email: string;
    selectedCards: Card[];
    total: number;
    date: string;
  }[];

  setSearchQuery: (query: string) => void;
  sortByDate: () => void;
  sortByPrice: () => void;
  sortByName: () => void;
}

const RequestedBudgetSection: React.FC<RequestedBudgetSectionProps> = ({
  setSearchQuery,
  sortByDate,
  sortByPrice,
  sortByName,
}) => {
  const [isInputVisible, setInputVisible] = useState(false);

  const handleIconClick = () => setInputVisible(true);
  const handleBlur = () => setInputVisible(false);

  return (
    <div className="d-flex gap-4 flex-column align-items-center w-100">
      <div className="d-flex justify-content-center w-100 flex-row align-items-center">
        <div className="card border-0 d-flex flex-row justify-content-between">
          <h3>Presupuestos en curso</h3>
          <div className="d-flex flex-row gap-3 mt-5">
            <div className="search-container">
              {!isInputVisible && (
                <i
                  className="fas fa-search"
                  onClick={handleIconClick}
                  style={{ cursor: "pointer" }}
                ></i>
              )}
              {isInputVisible && (
                <input
                  type="text"
                  placeholder="Buscar..."
                  onBlur={handleBlur}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              )}
            </div>
            <button onClick={sortByDate} className="btn btn-white">
              Fecha
            </button>
            <button onClick={sortByPrice} className="btn btn-white">
              Importe
            </button>
            <button onClick={sortByName} className="btn btn-white">
              Nombre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedBudgetSection;
