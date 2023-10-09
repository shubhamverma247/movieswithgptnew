import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "model",
  initialState: {
    isOpen: false,
    movieId: 0,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    addMoviId: (state, action) => {
      state.movieId = action.payload;
    },
  },
});

export const { openModal, closeModal, addMoviId } = modalSlice.actions;
export default modalSlice.reducer;
