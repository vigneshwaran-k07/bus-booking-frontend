import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllTickets, bookTicket, cancelTicket, updatePassenger } from '../api/ticketApi';

export const TICKETS_KEY = ['tickets'];

export function useAllTickets() {
  return useQuery({
    queryKey: TICKETS_KEY,
    queryFn: fetchAllTickets,
    staleTime: 30_000,
  });
}

export function useBookTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, firstName, lastName, email, gender }) =>
      bookTicket(id, { firstName, lastName, email, gender }),
    onSuccess: () => qc.invalidateQueries({ queryKey: TICKETS_KEY }),
  });
}

export function useCancelTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => cancelTicket(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: TICKETS_KEY }),
  });
}

export function useUpdatePassenger() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, firstName, lastName, email, gender }) =>
      updatePassenger(id, { firstName, lastName, email, gender }),
    onSuccess: () => qc.invalidateQueries({ queryKey: TICKETS_KEY }),
  });
}
