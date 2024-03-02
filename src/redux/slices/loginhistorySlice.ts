import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginHistory } from 'types/loginHistory';

export interface LoginHistoryState {
  history: Array<LoginHistory>;
}
  
const initialState: LoginHistoryState = {
  history: [],
};
  
// Slice
export const loginHistorySlice = createSlice({
  name: 'loginHistory',
  initialState,
  reducers: {
    setLoginHistory: (state, action: PayloadAction<Array<any>>) => {
      state.history = action.payload;
    },
  },

});

export const { setLoginHistory } = loginHistorySlice.actions;

export default loginHistorySlice.reducer;
  