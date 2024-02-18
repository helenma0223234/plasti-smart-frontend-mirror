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
    const model = await tfjs.loadLayersModel(MODEL_URL);
    console.log('Model loaded successfully');
    return model;
  },
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
