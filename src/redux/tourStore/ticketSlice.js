// ticketSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    selectedTicket: null,
    modalOpen: false,
    searchTickets: [],
    sortOrder: "desc" // Añadir el estado para almacenar el tipo de ordenamiento
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload; 
    },
    setSearchTickets: (state, action) => {
      state.searchTickets = action.payload
  },
  },
});

export const { setTickets, setSelectedTicket, setModalOpen, setSortOrder, setSearchTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
