import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';
import INotificationSettings from 'types/notification_settings';
import { getBearerToken } from 'utils/asyncStorage';

export interface NotificationSettingsState {
  settings: INotificationSettings | null;
  loading: boolean;
}

const initialState: NotificationSettingsState = {
  settings: null,
  loading: false,
};

export const createNotificationSettings = createAsyncThunk(
  'notificationSettings/create',
  async (req: INotificationSettings, { dispatch }) => {
    const token = await getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    dispatch(startLoading());
    return axios
      .post(`${SERVER_URL}notification_settings/${req.userID}`, req, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => dispatch(stopLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating Notification Settings', error);
        return false;
      });
  },
);

export const createDefaultNotificationSettings = createAsyncThunk(
  'notificationSettings/createDefault',
  async (req: { userID:string }, { dispatch }) => {
    const token = await getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    dispatch(startLoading());
    return axios
      .post(`${SERVER_URL}notification_settings/createDefault/${req.userID}`, req,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating Notification Settings', error);
        return false;
      });
  },
);

export const updateNotificationSettings = createAsyncThunk(
  'notificationSettings/update',
  async (req: Partial<INotificationSettings>, { dispatch }) => {
    const token = await getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    dispatch(startLoading());
    return axios
      .put(`${SERVER_URL}notification_settings/${req.userID}`, req,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => dispatch(stopLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when updating Notification Settings', error);
        if (error.response && error.response.status === 500 && req.userID) {
          dispatch(createDefaultNotificationSettings({ userID: req.userID }));
        }
      });
  },
);

export const getNotificationSettings = createAsyncThunk(
  'notificationSettings/get',
  async (req: { userID: string }, { dispatch }) => {
    const token = await getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    dispatch(startLoading());
    return axios
      .get(`${SERVER_URL}notification_settings/${req.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => dispatch(stopLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting resource', error);
        return false;
      });
  },
);


export const deleteNotificationSettings = createAsyncThunk(
  'notificationSettings/delete',
  async (req:  { userID: string }, { dispatch }) => {
    const token = await getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    dispatch(startLoading());
    return axios
      .delete(`${SERVER_URL}notification_settings/${req.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => dispatch(stopLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting resource', error);
        return false;
      });
  },
);

const notificationSettingsSlice = createSlice({
  name: 'notificationSettings',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNotificationSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    builder.addCase(createDefaultNotificationSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    builder.addCase(updateNotificationSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    builder.addCase(getNotificationSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    builder.addCase(deleteNotificationSettings.fulfilled, (state) => {
      state.settings = null;
    });
  },
});

export const { startLoading, stopLoading } = notificationSettingsSlice.actions;

export default notificationSettingsSlice.reducer;
