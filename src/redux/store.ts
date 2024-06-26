import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import connectionReducer from './slices/connectionSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import cameraReducer from './slices/cameraSlice';
import loginhistoryReducer from './slices/loginhistorySlice';
import scanReducer from './slices/scanSlice';
import notificationReducer from './slices/notificationSlice';
import tutorialReducer from './slices/tutorialSlice'; 

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    auth: authReducer,
    users: usersReducer,
    camera: cameraReducer,
    loginhistory: loginhistoryReducer,
    scan : scanReducer,
    notifications : notificationReducer,
    tutorial: tutorialReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
