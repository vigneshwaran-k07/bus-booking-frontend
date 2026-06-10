import { useState } from 'react';
import { toast } from 'sonner';
import SeatMap from '../components/SeatMap';
import BookingModal from '../components/BookingModal';
import { useAllTickets, useBookTicket } from '../hooks/useTickets';

export default function ReservePage() {
  const { data: tickets = [], isLoading, error } = useAllTickets();
  const bookMutation = useBookTicket();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleBook = async (id, form) => {
    await bookMutation.mutateAsync({ id, ...form });
    toast.success('Seat booked!', {
      description: `Seat #${selectedTicket?.seat_number} reserved for ${form.firstName} ${form.lastName}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-400 text-sm">Loading seat map…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="bg-red-50 border border-red-200 rounded-2xl px-8 py-6 text-center max-w-sm">
          <p className="text-red-600 font-medium">Failed to load seat map</p>
          <p className="text-red-400 text-sm mt-1">Check your backend connection and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Reserve a Seat</h1>
        <p className="text-gray-500 mt-1 text-sm">Select an available seat from the layout below</p>
      </div>

      <SeatMap
        tickets={tickets}
        onSeatClick={setSelectedTicket}
        selectedTicketId={selectedTicket?.id}
      />

      {selectedTicket && (
        <BookingModal
          ticket={selectedTicket}
          onConfirm={handleBook}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
