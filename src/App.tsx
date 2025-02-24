import "./app.css";
import "./index.css";
import Budget from "./components/Budget";
import { useCallback, useState, useEffect } from "react";
import { CheckBoxCard } from "./components/CheckBoxCard";
import { CardContainer } from "./components/CardContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import cards from "./data/cards.json";  // Asegúrate de que cada card tenga un id único
import "@fortawesome/fontawesome-free/css/all.min.css";




function App() {
  const [promoIsActive, setPromoIsActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<
  { id: number; title: string; price: number; text: string; pages?: number; languages?: number }[]
>([]);


  const handleCheckboxChange = useCallback(
    (
      price: number,
      isSelected: boolean,
      card: { id: number; title: string; price: number; text: string; pages: number | undefined; languages: number | undefined }
    ) => {
      if (!isSelected) {
        setTotalPrice((prevTotal) => prevTotal - price);
        setSelectedCards((prev) => prev.filter((c) => c.id !== card.id));
      } else {
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

  const updateCard = useCallback((card: { id: number; title: string; price: number; text: string; pages: number | undefined; languages: number | undefined}) => {
    setSelectedCards((prev) =>
      prev.map((c) => (c.id === card.id ? card : c))
    );
  }, []);

  useEffect(() => {
    const sum = selectedCards.reduce((acc, card) => acc + card.price, 0);
    setTotalPrice(sum);
  }, [selectedCards]);

  
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
        backgroundColor: promoIsActive ? '#007704' : '#ccc', 
        color: promoIsActive ? 'white' : 'black', 
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', 
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



export default App;
