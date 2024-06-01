import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface CameraState {
  cameraOpen: boolean;
}

const initialState: CameraState = {
  cameraOpen: false,
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    cameraOpened: (state) => {
      state.cameraOpen = true;
    },
    cameraClosed: (state) => {
      state.cameraOpen = false;
    },
  },
});

export const { cameraOpened, cameraClosed } = cameraSlice.actions;

export const cameraClosedAsync = createAsyncThunk('camera/cameraClosedAsync', async (_, { dispatch }) => {
  dispatch(cameraClosed());
});

export default cameraSlice.reducer;