export interface AppProps {
  reservations: {
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
  }[];
  setReservations: React.Dispatch<
    React.SetStateAction<
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
    >
  >;
}