import { useState } from 'react';
import { toast } from 'sonner';
import PassengerTable from '../components/PassengerTable';
import UpdateModal from '../components/UpdateModal';
import ConfirmModal from '../components/ConfirmModal';
import { useAllTickets, useCancelTicket, useUpdatePassenger } from '../hooks/useTickets';

export default function DashboardPage() {
  const { data: tickets = [], isLoading, error } = useAllTickets();
  const cancelMutation = useCancelTicket();
  const updateMutation = useUpdatePassenger();
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleUpdate = async (id, form) => {
    await updateMutation.mutateAsync({ id, ...form });
    toast.success('Passenger updated!', {
      description: `${form.firstName} ${form.lastName}'s details have been saved`,
    });
  };

  const handleDelete = async (id) => {
    const p = tickets.find((t) => t.id === id);
    await cancelMutation.mutateAsync(id);
    toast.success('Reservation deleted', {
      description: `Seat #${p?.seat_number} is now available`,
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
          <p className="text-gray-400 text-sm">Loading passengers…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="bg-red-50 border border-red-200 rounded-2xl px-8 py-6 text-center">
          <p className="text-red-600 font-medium">Failed to load passengers</p>
        </div>
      </div>
    );
  }

  const passengers = tickets
    .filter((t) => t.status === 'closed')
    .sort((a, b) => a.seat_number - b.seat_number);

  const total = tickets.length;
  const booked = passengers.length;
  const available = total - booked;
  const occupancy = total > 0 ? Math.round((booked / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Passenger Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage all reservations for this trip</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Seats" value={total} bg="bg-slate-50 border-slate-200" />
        <StatCard label="Booked" value={booked} bg="bg-blue-50 border-blue-200" valueClass="text-blue-700" />
        <StatCard label="Available" value={available} bg="bg-emerald-50 border-emerald-200" valueClass="text-emerald-700" />
        <StatCard label="Occupancy" value={`${occupancy}%`} bg="bg-violet-50 border-violet-200" valueClass="text-violet-700" />
      </div>

      <PassengerTable
        passengers={passengers}
        onEdit={setEditTarget}
        onDelete={setDeleteTarget}
      />

      {editTarget && (
        <UpdateModal
          ticket={editTarget}
          onConfirm={handleUpdate}
          onClose={() => setEditTarget(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          ticket={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, bg, valueClass = 'text-gray-800' }) {
  return (
    <div className={`border rounded-2xl px-4 py-3.5 ${bg}`}>
      <p className={`text-2xl font-bold leading-none ${valueClass}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
