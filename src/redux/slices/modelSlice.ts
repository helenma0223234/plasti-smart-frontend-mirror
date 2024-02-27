import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as tfjs from '@tensorflow/tfjs';
import { MODEL_URL } from '../../utils/constants';

export interface ModelState {
  model: tfjs.LayersModel | null;
}

const initialState: ModelState = {
  model: null,
};

export const loadModel = createAsyncThunk(
  'model/loadModel',
  async () => {
    try {
      await tfjs.ready();
      const model = await tfjs.loadLayersModel(MODEL_URL);
      console.log('model loaded in async thunk');
      return model;
    }
    catch (error) {
      console.log('model not loaded in async thunk', error);
      throw error;
    }
    
  }
);

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadModel.fulfilled, (state, action) => {
        state.model = action.payload;
      });
  },
});

export default modelSlice.reducer;
