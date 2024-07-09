
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortOrderUser: "desc"
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoged: (state, action) => {
      state.dataUser = action.payload;
    },
    setUser: (state, action) => {
      state.dataUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.dataAllUsers = action.payload;
    },
    setUserMsgErr: (state, action) => {
      state.setUserMsgErr = action.payload;

    },
    setUpdateClient: (state, action) => {
      state.client = action.payload;
    },
    setFormState: (state, action) => {
      state.setUserMsgErr = action.payload;
    },
    setEditTicket: (state, action) => {
      state.editTicket = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setSortOrderUser: (state, action) => {
      state.sortOrderUser = action.payload;
    },
  }
})


export const { isLoged, setUser, setAllUsers, setUserMsgErr, setFormState, setEditTicket, setUpdateClient, setSearch, setSortOrderUser } = userSlice.actions;

export default userSlice.reducer
