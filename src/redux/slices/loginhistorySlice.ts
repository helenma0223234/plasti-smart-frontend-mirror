import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginHistory } from 'types/loginHistory';

export interface LoginHistoryState {
  history: Array<LoginHistory>;
}
  
const initialState: LoginHistoryState = {
  history: [],
};

export const loginHistorySlice = createSlice({
  name: 'loginHistory',
  initialState,
  reducers: {
    setLoginHistory: (state, action: PayloadAction<Array<any>>) => {
      state.history = action.payload;
    },
    updateFirstLoginHistory: (state, action: PayloadAction<LoginHistory>) => {
      if (state.history.length > 0) {
        state.history[0] = action.payload;
      }
    },
  },

});

export const { setLoginHistory, updateFirstLoginHistory } = loginHistorySlice.actions;

export default loginHistorySlice.reducer;
  