import { useState } from "react";
import RequestedBudgetSection from "./RequestedBudgetSection";

interface BudgetProps {
  totalPrice: number;
  selectedCards: {
    id: number;
    title: string;
    price: number;
    text: string;
    languages?: number;
    pages?: number;
  }[];
}

interface Card {
  id: number;
  title: string;
  price: number;
  text: string;
  pages?: number;
  languages?: number;
}

const Budget: React.FC<BudgetProps> = ({ totalPrice, selectedCards }) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [reservations, setReservations] = useState<
    {
      name: string;
      phone: string;
      email: string;
      selectedCards: Card[];
      total: number;
    }[]
  >([]);
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validación: campos requeridos
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Validación: al menos debe estar seleccionada una tarjeta (card)
    if (selectedCards.length === 0) {
      setError("Por favor, seleccione al menos un servicio.");
      return;
    }

    // Si todo está correcto, se limpia el error
    setError("");

    // Eliminar duplicados y mantener el último precio para cada título
    const uniqueCards = selectedCards.reduce((acc: Card[], card) => {
      const index = acc.findIndex((c) => c.title === card.title);
      if (index !== -1) {
        acc[index] = card; // Sobrescribimos con el último precio
      } else {
        acc.push(card); // Si no existe, añadimos la tarjeta
      }
      return acc;
    }, []);

    const newReservation = {
      name,
      phone,
      email,
      selectedCards: uniqueCards,
      total: totalPrice,
    };
    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]);

    // Limpiar los campos después de enviar
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <div className="d-flex gap-4 flex-column align-items-center w-100">
      <div className="d-flex justify-content-center w-100">
        <div className="card shadow-lg card-selected">
          <h3>Pedir presupuesto</h3>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-dark">
              Solicitar presupuesto <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
      <RequestedBudgetSection />
      <div className="w-100 justify-content-center d-flex align-items-center gap-4 flex-column">
        {reservations.map((reservation, index) => (
          <div key={index} className="card shadow-lg p-4 flex-row">
            <div className="card-body d-flex flex-row justify-content-between">
              <div className="d-flex text-start flex-column">
                <h5 className="card-title">{reservation.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {reservation.email}
                </p>
                <p className="card-text">
                  <strong>Teléfono:</strong> {reservation.phone}
                </p>
              </div>

              <div className="mt-3">
                <h5 className="fw-bold">Servicios Contratados</h5>
                <ul>
                  {reservation.selectedCards.map((card) => (
                    <li key={card.title + card.id}>
                      {card.title} - {card.languages} idiomas, {card.pages} páginas
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
        ))}
      </div>
    </div>
  );
};

export default Budget;
