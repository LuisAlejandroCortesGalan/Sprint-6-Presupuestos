import { Reservation } from "../types/budgetTypes";

export const useSortReservations = (reservations: Reservation[], setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>) => {
  const sortByDate = () => {
    const sorted = [...reservations].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
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

  return { sortByDate, sortByPrice, sortByName };
};