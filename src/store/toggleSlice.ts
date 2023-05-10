import { createSlice } from '@reduxjs/toolkit';

interface ToggleState {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

const initialState: ToggleState = {
  add: false,
  edit: false,
  delete: false,
};

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleAdd: (state, action) => {
      state.add = action.payload;
    },
    toggleEdit: (state, action) => {
      state.edit = action.payload;
    },
    toggleDelete: (state, action) => {
      state.delete = action.payload;
    },
  },
});

export const { toggleAdd, toggleEdit, toggleDelete } =
  toggleSlice.actions;
export default toggleSlice.reducer;
