export interface BudgetProps {
    totalPrice: number;
    selectedCards: Card[];
    reservations: Reservation[];
    setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  }
  
  export interface Card {
    id: number;
    title: string;
    price: number;
    text: string;
    pages?: number;
    languages?: number;
  }
  
  export interface Reservation {
    id: string;
    name: string;
    phone: string;
    email: string;
    selectedCards: Card[];
    total: number;
    date: string;
  }