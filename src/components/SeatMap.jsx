import SeatCell from './SeatCell';

function buildRows(tickets, start, end) {
  return tickets
    .filter((t) => t.seat_number >= start && t.seat_number <= end)
    .sort((a, b) => a.seat_number - b.seat_number)
    .reduce((rows, t, i) => {
      if (i % 4 === 0) rows.push([]);
      rows[rows.length - 1].push(t);
      return rows;
    }, []);
}

export default function SeatMap({ tickets, onSeatClick, selectedTicketId }) {
  const lowerRows = buildRows(tickets, 1, 20);
  const upperRows = buildRows(tickets, 21, 40);

  return (
    <div className="flex flex-col items-center gap-6 w-full">

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <LegendItem
          seatClass="border-green-500 bg-white"
          iconClass="text-green-400"
          stripClass="bg-green-200"
          label="Available"
        />
        <LegendItem
          seatClass="border-blue-400 bg-blue-50"
          iconClass="text-blue-400"
          stripClass="bg-blue-300"
          label="Male"
        />
        <LegendItem
          seatClass="border-pink-400 bg-pink-50"
          iconClass="text-pink-400"
          stripClass="bg-pink-300"
          label="Female"
        />
        <LegendItem
          seatClass="border-gray-200 bg-slate-100"
          iconClass="text-slate-300"
          stripClass="bg-slate-200"
          label="Sold"
          labelClass="text-gray-400"
        />
      </div>

      {/* Deck panels */}
      <div className="flex flex-col lg:flex-row gap-5 justify-center w-full">
        <DeckPanel
          label="Lower deck"
          rows={lowerRows}
          showSteering
          onSeatClick={onSeatClick}
          selectedTicketId={selectedTicketId}
        />
        <DeckPanel
          label="Upper deck"
          rows={upperRows}
          onSeatClick={onSeatClick}
          selectedTicketId={selectedTicketId}
        />
      </div>

      <p className="text-xs text-gray-400 text-center">
        Click an available seat to begin your reservation
      </p>
    </div>
  );
}

function DeckPanel({ label, rows, showSteering = false, onSeatClick, selectedTicketId }) {
  const flat = rows.flat();
  const available = flat.filter((t) => t.status === 'open').length;
  const total = flat.length;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 w-fit mx-auto lg:mx-0">
      {/* Panel header */}
      <div className="flex items-center justify-between mb-5 gap-6">
        <div>
          <h2 className="text-sm font-bold text-gray-800">{label}</h2>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {available} of {total} available
          </p>
        </div>
        {showSteering && <SteeringWheel />}
      </div>

      {/* Seat rows */}
      <div className="space-y-3">
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-end gap-1">
            {/* Left pair */}
            <div className="flex gap-2">
              {row.slice(0, 2).map((t) => (
                <SeatCell
                  key={t.id}
                  ticket={t}
                  onClick={onSeatClick}
                  isSelected={t.id === selectedTicketId}
                />
              ))}
            </div>

            {/* Aisle */}
            <div className="flex flex-col items-center gap-1 px-2 pb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-0.5 h-1.5 bg-gray-200 rounded-full" />
              ))}
            </div>

            {/* Right pair */}
            <div className="flex gap-2">
              {row.slice(2, 4).map((t) => (
                <SeatCell
                  key={t.id}
                  ticket={t}
                  onClick={onSeatClick}
                  isSelected={t.id === selectedTicketId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendItem({ seatClass, iconClass, stripClass, label, labelClass = 'text-gray-500' }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-[30px] h-[42px] rounded-xl border-2 flex flex-col items-center justify-center gap-1 ${seatClass}`}>
        <svg className={`w-3.5 h-3.5 ${iconClass}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
        <div className={`w-4 h-[3px] rounded-full ${stripClass}`} />
      </div>
      <span className={`text-[10px] font-medium ${labelClass}`}>{label}</span>
    </div>
  );
}

function SteeringWheel() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" stroke="#D1D5DB" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="4.5" stroke="#D1D5DB" strokeWidth="2.5" />
      <line x1="20" y1="15.5" x2="20" y2="4" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16.1" y1="22.5" x2="7.1" y2="33.8" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="23.9" y1="22.5" x2="32.9" y2="33.8" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
