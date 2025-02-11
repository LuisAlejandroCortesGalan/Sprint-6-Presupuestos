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
      date: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const uniqueCards = selectedCards.reduce((acc: Card[], card) => {
      const index = acc.findIndex((c) => c.title === card.title);
      if (index !== -1) {
        acc[index] = card;
      } else {
        acc.push(card);
      }
      return acc;
    }, []);

    const currentDate = new Date().toLocaleString();

    const newReservation = {
      name,
      phone,
      email,
      selectedCards: uniqueCards,
      total: totalPrice,
      date: currentDate,
    };

    setReservations((prevReservations) => [...prevReservations, newReservation]);

    setName("");
    setPhone("");
    setEmail("");
  };

  const sortByDate = () => {
    const sorted = [...reservations].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setReservations(sorted);
  };

  const sortByPrice = () => {
    const sorted = [...reservations].sort((a, b) => a.total - b.total);
    setReservations(sorted);
  };

  const sortByName = () => {
    const sorted = [...reservations].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setReservations(sorted);
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex gap-4 flex-column align-items-center w-100">
      <div className="d-flex justify-content-center w-100">
        <div className="card shadow-lg card-selected">
          <h3>Pedir presupuesto</h3>
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

      <RequestedBudgetSection
        reservations={reservations}
        setSearchQuery={setSearchQuery}
        sortByDate={sortByDate}
        sortByPrice={sortByPrice}
        sortByName={sortByName}
      />

      <div className="w-100 justify-content-center d-flex align-items-center gap-4 flex-column">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation, index) => (
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
                        {card.title} - {card.languages} idiomas, {card.pages}{" "}
                        páginas
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
