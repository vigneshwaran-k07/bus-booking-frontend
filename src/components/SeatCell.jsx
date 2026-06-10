export default function SeatCell({ ticket, onClick, isSelected = false }) {
  const { status, gender } = ticket;
  const isBooked = status === 'closed';
  const s = getStyles(isBooked, gender, isSelected);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={() => !isBooked && onClick(ticket)}
        disabled={isBooked}
        title={
          isBooked
            ? `Seat ${ticket.seat_number} — ${gender === 'female' ? 'Female' : gender === 'male' ? 'Male' : 'Sold'}`
            : `Seat ${ticket.seat_number} — Available`
        }
        className={`
          relative flex flex-col items-center justify-center gap-2
          w-[52px] h-[78px] rounded-2xl border-2 transition-all duration-200
          ${s.border} ${s.bg}
          ${!isBooked
            ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-95'
            : 'cursor-not-allowed'
          }
          ${isSelected ? `shadow-lg ${s.shadow}` : ''}
        `}
      >
        {/* Person silhouette */}
        <svg className={`w-[22px] h-[22px] ${s.icon}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>

        {/* Blanket strip */}
        <div className={`w-7 h-[5px] rounded-full ${s.strip}`} />
      </button>

      {/* Label */}
      <span className={`text-[10px] font-semibold leading-none ${s.label}`}>
        {isBooked ? 'Sold' : `#${ticket.seat_number}`}
      </span>
    </div>
  );
}

function getStyles(isBooked, gender, isSelected) {
  // Available — currently being selected (modal open)
  if (!isBooked && isSelected) {
    return {
      border: 'border-green-600 ring-2 ring-green-400 ring-offset-1',
      bg: 'bg-green-50',
      icon: 'text-green-600',
      strip: 'bg-green-400',
      label: 'text-green-700',
      shadow: 'shadow-green-200',
    };
  }

  // Available — idle
  if (!isBooked) {
    return {
      border: 'border-green-500',
      bg: 'bg-white',
      icon: 'text-green-400',
      strip: 'bg-green-200',
      label: 'text-green-600',
      shadow: 'shadow-green-100',
    };
  }

  // Booked by female
  if (gender === 'female') {
    return {
      border: 'border-pink-400',
      bg: 'bg-pink-50',
      icon: 'text-pink-400',
      strip: 'bg-pink-300',
      label: 'text-pink-500',
      shadow: '',
    };
  }

  // Booked by male
  if (gender === 'male') {
    return {
      border: 'border-blue-400',
      bg: 'bg-blue-50',
      icon: 'text-blue-400',
      strip: 'bg-blue-300',
      label: 'text-blue-500',
      shadow: '',
    };
  }

  // Booked — no gender (legacy / fallback)
  return {
    border: 'border-gray-200',
    bg: 'bg-slate-100',
    icon: 'text-slate-300',
    strip: 'bg-slate-200',
    label: 'text-gray-400',
    shadow: '',
  };
}
