import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchAllTickets = () =>
  api.get('/tickets').then((r) => r.data.data);

export const bookTicket = (id, { firstName, lastName, email, gender }) =>
  api
    .patch(`/tickets/${id}`, {
      status: 'closed',
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
    })
    .then((r) => r.data.data);

export const cancelTicket = (id) =>
  api.patch(`/tickets/${id}`, { status: 'open' }).then((r) => r.data.data);

export const updatePassenger = (id, { firstName, lastName, email, gender }) =>
  api
    .patch(`/tickets/${id}`, {
      status: 'closed',
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
    })
    .then((r) => r.data.data);
