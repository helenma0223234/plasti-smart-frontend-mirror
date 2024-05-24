import { createSlice } from '@reduxjs/toolkit';

export interface ScanState {
  recycled: boolean;
}

const initialState: ScanState = {
  recycled: false,
};

export const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    recycledRedux: (state) => {
      state.recycled = true;
    },
    reusedRedux: (state) => {
      state.recycled = false;
    },
  },
});

export const { recycledRedux, reusedRedux } = scanSlice.actions;

export default scanSlice.reducer;