import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface TutorialState {
  needTutorial: boolean;
}

const initialState: TutorialState = {
  needTutorial: false,
};

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    setTutorial: (state) => {
      state.needTutorial = true;
    },
    doneTutorial: (state) => {
      state.needTutorial = false;
    },
  },
});

export const { setTutorial, doneTutorial } = tutorialSlice.actions;

export const setTutorialAsync = createAsyncThunk('tutorial/setTutorialAsync', async (_, { dispatch }) => {
  dispatch(setTutorial());
});

export default tutorialSlice.reducer;