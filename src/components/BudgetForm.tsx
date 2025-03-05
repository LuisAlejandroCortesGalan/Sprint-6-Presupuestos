import { useState, FormEvent } from "react";
import { Card, Reservation } from "../types/budgetTypes";
import { validateBudgetForm } from "../utils/validateBudgetFrom";

interface BudgetFormProps {
  totalPrice: number;
  selectedCards: Card[];
  onSubmit: (reservation: Reservation) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ totalPrice, selectedCards, onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newErrors = validateBudgetForm(name, phone, email, selectedCards);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

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
    const newId = crypto.randomUUID();

    const newReservation: Reservation = {
      id: newId,
      name,
      phone,
      email,
      selectedCards: uniqueCards,
      total: totalPrice,
      date: currentDate,
    };

    onSubmit(newReservation);
    setName("");
    setPhone("");
    setEmail("");
    setErrors({});
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <div className="card shadow-lg card-selected">
        <h3>Pedir presupuesto</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <button type="submit" className="btn btn-dark mt-3">
            Solicitar presupuesto <i className="fas fa-arrow-right"></i>
          </button>
        </form>
        {errors.services && (
            <div className="text-danger mt-2">{errors.services}</div>
          )}
          {errors.webDetails && (
            <div className="text-danger mt-2">{errors.webDetails}</div>
          )}
      </div>
    </div>
  );
};

export default BudgetForm;