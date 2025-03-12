import { useParams, Link } from "react-router-dom";
import { BudgetDetailProps } from "../types/budgetDetailTypes";


const BudgetDetail: React.FC<BudgetDetailProps> = ({ reservations }) => {
  const { id } = useParams<{ id: string }>();
  const reservation = reservations.find((r) => r.id === id);

  if (!reservation) {
    return <p>Presupuesto no encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Detalles del Presupuesto</h2>

      <div className="card shadow-lg p-4">
        <div className="card-body">
          <h5 className="card-title">{reservation.name}</h5>
          <p className="card-text">
            <strong>Email:</strong> {reservation.email}
          </p>
          <p className="card-text">
            <strong>Teléfono:</strong> {reservation.phone}
          </p>
          <p className="card-text">
            <strong>Fecha:</strong> {reservation.date}
          </p>
          <h4 className="m-4">Servicios Contratados:</h4>
          <ul>
            {reservation.selectedCards.map((card) => (
              <li key={card.id}>
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
          <p>
            <strong>Total:</strong> €{reservation.total}
          </p>
          <Link to="/app" className="btn btn-danger m-3">
        Volver
      </Link>
        </div>
      </div>
    </div>
  );
};

export default BudgetDetail;