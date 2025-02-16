import "./app.css";
import "./index.css";
import Budget from "./components/Budget";
import { useCallback, useState, useEffect } from "react";
import { CheckBoxCard } from "./components/CheckBoxCard";
import { CardContainer } from "./components/CardContainer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Lumiflex } from "uvcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import cards from "./data/cards.json";  // Asegúrate de que cada card tenga un id único
import "@fortawesome/fontawesome-free/css/all.min.css";


function Home() {
  return (
    <div className="lumiflexContainer">
      <Lumiflex />
      <div className="lumiflexContent">
        <h1 className="fw-bold mb-5 fs-1">Bienvenido a la Calculadora de Precios</h1>
        <Link to="/app" className="btn btn-light btn-lg">Ir a la calculadora</Link>
      </div>
    </div>
  );
}

function App() {
  const [promoIsActive, setPromoIsActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<
  { id: number; title: string; price: number; text: string; pages?: number; languages?: number }[]
>([]);


  // Función para seleccionar o deseleccionar una tarjeta
  const handleCheckboxChange = useCallback(
    (
      price: number,
      isSelected: boolean,
      card: { id: number; title: string; price: number; text: string; pages: number | undefined; languages: number | undefined }
    ) => {
      if (!isSelected) {
        // Se deselecciona: restamos y removemos la tarjeta
        setTotalPrice((prevTotal) => prevTotal - price);
        setSelectedCards((prev) => prev.filter((c) => c.id !== card.id));
      } else {
        // Se selecciona: sumamos y agregamos la tarjeta (si no existe)
        setTotalPrice((prevTotal) => prevTotal + price);
        setSelectedCards((prev) => {
          if (!prev.some((selectedCard) => selectedCard.id === card.id)) {
            return [...prev, card];
          }
          return prev;
        });
      }
    },
    []
  );

  // Función para actualizar los datos de una tarjeta que ya está seleccionada.
  const updateCard = useCallback((card: { id: number; title: string; price: number; text: string; pages: number | undefined; languages: number | undefined}) => {
    setSelectedCards((prev) =>
      prev.map((c) => (c.id === card.id ? card : c))
    );
  }, []);

  // Cada vez que selectedCards cambie, recalculamos el total
  useEffect(() => {
    const sum = selectedCards.reduce((acc, card) => acc + card.price, 0);
    setTotalPrice(sum);
  }, [selectedCards]);

  
  // Función que cambia el estado al hacer clic
  const handleClick = () => {
    setPromoIsActive(!promoIsActive);
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 gap-4">
      <CardContainer />
      <div className="d-flex gap-4 flex-column align-items-center w-100">
      <button
      onClick={handleClick}
      style={{
        backgroundColor: promoIsActive ? '#007704' : '#ccc', // Color verde si activo, gris si inactivo
        color: promoIsActive ? 'white' : 'black', // Texto blanco si activo, negro si inactivo
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Transición suave para el cambio de color
      }}
    >
      {promoIsActive ? 'Descuento Aplicado' : 'Aplicar descuento del 20%!'}
    </button>
    
        {cards.map((card) => (
          <div key={card.id} className="d-flex justify-content-center w-100">
            <CheckBoxCard
              promoIsActive={promoIsActive} 
              id={card.id} 
              title={card.title}
              price={card.price}
              text={card.text}
              handleCheckboxChange={handleCheckboxChange}
              updateCard={updateCard}  
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end w-50 fw-bolder align-items-center">
        <p className="fs-5">Precio Presupuestado:</p>
        <p className="fs-3 ms-5">{totalPrice}</p>
        <span>€</span>
      </div>
      <div className="d-flex gap-4 flex-column align-items-center w-100">
        <Budget totalPrice={totalPrice} selectedCards={selectedCards} />
        <hr />
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
