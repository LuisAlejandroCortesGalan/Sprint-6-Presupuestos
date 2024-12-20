import "./app.css";
import "./index.css";
import { useState, useEffect, useCallback } from "react";
import { CheckBoxCard } from "./components/CheckBoxCard";
import { CardContainer } from "./components/CardContainer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Lumiflex } from "uvcanvas";
import "bootstrap/dist/css/bootstrap.min.css";

const cards = [
  {
    id: 1,
    title: "SEO",
    price: 300,
    text: "Programación de una web responsive completa",
  },
  {
    id: 2,
    title: "ADS",
    price: 400,
    text: "Programación de una web responsive completa",
  },
  {
    id: 3,
    title: "WEB",
    price: 500,
    text: "Programación de una web responsive completa",
  },
];
function Home() {
  return (
    <div className="lumiflexContainer">
      <Lumiflex/>
      <div className="lumiflexContent">
        <h1 className="fw-bold">Bienvenido a la Calculadora de Precios</h1>
        <Link to="/app" className="btn btn-dark btn-lg">Ir a la calculadora</Link>
      </div>
    </div>
  );
}
function App() {
  const [selectedCard, setSelectedCards] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Actualiza el precio total cada vez que se cambia una selección
  const updateTotalPrice = useCallback(() => {
    let total = 0;

    // Calcula el precio total de las tarjetas seleccionadas
    selectedCard.forEach((id) => {
      const card = cards.find((card) => card.id === id);
      if (card) total += card.price;
    });

    setTotalPrice(total);
  }, [selectedCard]);

  // Calcula si "WEB" está seleccionado
  const hasWeb = selectedCard.some((id) => {
    const card = cards.find((card) => card.id === id);
    return card?.title === "WEB"; 
  });

  const handleCheckboxChange = (id: number) => {
    setSelectedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id) // Desmarcar
        : [...prev, id] // Marcar
    );
    updateTotalPrice();
  };

  const updateTotalPriceDirectly = (amount: number) => {
    setTotalPrice((prev) => prev + amount);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [selectedCard, updateTotalPrice]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 gap-4">
      <CardContainer />
      <div className="d-flex gap-4 flex-column align-items-center w-100">
        {cards.map((card) => (
          <div key={card.id} className="d-flex justify-content-center w-100">
            <CheckBoxCard
              id={card.id}
              title={card.title}
              price={card.price}
              text={card.text}
              handleCheckboxChange={handleCheckboxChange}
              hasWeb={hasWeb}
              updateTotalPriceDirectly={updateTotalPriceDirectly}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end w-50 fw-bolder align-items-center">
        <p className="fs-5">Precio Presupuestado:</p>
        <p className="fs-3 ms-5">{totalPrice}</p>
        <span>€</span>
      </div>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
}

export default Main;