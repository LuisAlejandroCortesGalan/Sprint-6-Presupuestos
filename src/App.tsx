import "./App.css";
import { useState } from "react";
import { CheckBoxCard } from "./components/CheckBoxCard";
import { CardContainer } from "./components/CardContainer";
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

function App() {
  const [selectedCard, setSelectedCards] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Actualiza el precio total cada vez que se cambia una selección
  const updateTotalPrice = (id: number, price: number) => {
    setTotalPrice((prevTotal) =>
      selectedCard.includes(id)
        ? prevTotal - price // Si se desmarca, resta el precio
        : prevTotal + price // Si se marca, suma el precio
    );
  };

  // Calcula si "WEB" está seleccionado
  const hasWeb = selectedCard.some((id) => {
    const card = cards.find((card) => card.id === id);
    return card?.title === "WEB"; 
  });

  const handleCheckboxChange = (id: number, price: number) => {
    setSelectedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id) // Desmarcar
        : [...prev, id] // Marcar
    );
    updateTotalPrice(id, price);
  };

  const updateTotalPriceDirectly = (amount: number) => {
    setTotalPrice((prev) => prev + amount)
    console.log("aver amount ", amount);
    
    
  };

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
              updateTotalPriceDirectly = {updateTotalPriceDirectly
              }
              // onPriceChange={updateTotalPrice}
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

export default App;