export interface BudgetDetailProps {
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
  }