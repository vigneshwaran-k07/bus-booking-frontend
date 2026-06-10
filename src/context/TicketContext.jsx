import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAllTickets, bookTicket, cancelTicket, updatePassenger } from '../api/ticketApi';

const TicketContext = createContext(null);

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllTickets();
      setTickets(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const book = async (id, form) => {
    const updated = await bookTicket(id, form);
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    return updated;
  };

  const cancel = async (id) => {
    const updated = await cancelTicket(id);
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    return updated;
  };

  const update = async (id, form) => {
    const updated = await updatePassenger(id, form);
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    return updated;
  };

  return (
    <TicketContext.Provider value={{ tickets, loading, error, loadTickets, book, cancel, update }}>
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error('useTickets must be used inside TicketProvider');
  return ctx;
};
