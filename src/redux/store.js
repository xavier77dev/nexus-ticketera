import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import companyReducer from './companySlice';
import ticketReducer from './tourStore/ticketSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    tickets: ticketReducer,
    
  },
})


export default store;