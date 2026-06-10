# Bus Ticketing Frontend

React + Vite + Tailwind CSS app for a 40-seat bus ticketing system.

## Setup

### Prerequisites
- Node.js 18+
- Backend API running (see `../backend/`)

### Install dependencies
```bash
npm install
```

### Configure environment
```bash
cp .env.example .env
# Set VITE_API_BASE_URL to your backend URL
```

### Run locally
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## Environment Variables

| Variable            | Description                 | Example                         |
|---------------------|-----------------------------|---------------------------------|
| `VITE_API_BASE_URL` | Backend API base URL        | `http://localhost:3000/api`     |

## Routes

| Path         | Description                                      |
|--------------|--------------------------------------------------|
| `/reserve`   | Bus seat map — click a seat to book it           |
| `/dashboard` | Passenger table — edit or delete reservations   |

## Features

- **Seat Map** — 40 seats across Lower and Upper Deck, color-coded (white = available, red = booked)
- **Booking Modal** — form with first name, last name, email validation
- **Dashboard Table** — inline edit (name/email), delete (cancels reservation)
- **Navbar** — dropdown to switch between views on every page
- **Context** — single source of truth via React Context; no prop drilling

## Deployment (Vercel / Netlify)

1. Push the `frontend/` folder to GitHub
2. Import the repo on Vercel or Netlify
3. Set the `VITE_API_BASE_URL` environment variable to your deployed backend URL
4. Deploy
