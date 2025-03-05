import { useState } from "react";
import { Link } from "react-router-dom";
import RequestedBudgetSection from "./RequestedBudgetSection";
import BudgetForm from "./BudgetForm";
import { BudgetProps, Reservation } from "../types/budgetTypes";
import { useSortReservations } from "../hooks/useSortReservations";

const Budget: React.FC<BudgetProps> = ({ totalPrice, selectedCards, reservations, setReservations }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { sortByDate, sortByPrice, sortByName } = useSortReservations(reservations, setReservations);

  const handleFormSubmit = (newReservation: Reservation) => {
    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]);
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex gap-4 flex-column align-items-center w-100">
      <BudgetForm totalPrice={totalPrice} selectedCards={selectedCards} onSubmit={handleFormSubmit} />

      <RequestedBudgetSection
        reservations={reservations}
        setSearchQuery={setSearchQuery}
        sortByDate={sortByDate}
        sortByPrice={sortByPrice}
        sortByName={sortByName}
      />

      <div className="w-100 justify-content-center d-flex align-items-center gap-4 flex-column">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <div key={reservation.id} className="card shadow-lg p-4 flex-row">
              <div className="card-body d-flex flex-row justify-content-between">
                <div className="d-flex text-start flex-column personalData">
                  <h5 className="card-title">{reservation.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {reservation.email}
                  </p>
                  <p className="card-text">
                    <strong>Teléfono:</strong> {reservation.phone}
                  </p>
                  <p className="card-text">
                    <strong>Enlace para compartir:</strong>{" "}
                    <Link to={`/budget/${reservation.id}`}>
                      {`${window.location.origin}/budget/${reservation.id}`}
                    </Link>
                  </p>
                </div>

                <div className="mt-3">
                  <h5 className="fw-bold">Servicios Contratados</h5>
                  <ul>
                    {reservation.selectedCards
                      .sort((a, b) =>
                        a.title === "WEB" ? -1 : b.title === "WEB" ? 1 : 0
                      )
                      .map((card) => (
                        <li key={card.id} className="text-start">
                          {card.title}
                          {card.title === "WEB" &&
                            card.languages !== undefined &&
                            card.pages !== undefined && (
                              <>
                                {" "}
                                - {card.languages} idiomas, {card.pages} páginas
                              </>
                            )}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-3">
                  <h5 className="fw-bold">Total:</h5>
                  <p>€{reservation.total}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron reservas.</p>
        )}
      </div>
    </div>
  );
};

export default Budget;