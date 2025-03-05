import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "../components/Home.tsx";
import App from "../App.tsx";
import BudgetDetail from "../components/BudgetDetail.tsx";

function Main() {
  const [reservations, setReservations] = useState<
    {
      id: string;
      name: string;
      phone: string;
      email: string;
      selectedCards: {
        id: number;
        title: string;
        price: number;
        text: string;
        pages?: number;
        languages?: number;
      }[];
      total: number;
      date: string;
    }[]
  >([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/app"
          element={
            <App
              reservations={reservations}
              setReservations={setReservations}
            />
          }
        />
        <Route
          path="/budget/:id"
          element={<BudgetDetail reservations={reservations} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;