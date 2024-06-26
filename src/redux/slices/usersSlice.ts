import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from 'utils/constants.js';
import axios from 'axios';
import { UserScopes, IUser } from 'types/users.jsx';
import { updateFirstLoginHistory } from './loginhistorySlice';
import { AvatarCustomization } from '../../types/avatars';
import { getBearerToken } from 'utils/asyncStorage';

// NOTE: commented out return false for failed request so not to break the app
// under circumstances like when user tries to update user email to existing emails

interface User {
  id: string;
  email?: string;
  token: string;
  password?: string;
  username?: string;
  name?: string;
  role?: UserScopes;
  lastLogin?: Date;
  rank?: number;
  avatarSet?: boolean;
  avatarID?: number;
  avatarColor?: number;
  avatarHealth?: number;
  avatarAccessoryEquipped?: number;
  avatarCustomization?: AvatarCustomization;
  points?: number;
  monthlyPoints?: number;
  monthlyTotalReused?: number;
  monthlyTotalRecycled?: number;
  Type1Recycled?: number;
  Type2Recycled?: number;
  Type3Recycled?: number;
  Type4Recycled?: number;
  Type5Recycled?: number;
  Type6Recycled?: number;
  Type7Recycled?: number;
  Type1Reused?: number;
  Type2Reused?: number;
  Type3Reused?: number;
  Type4Reused?: number;
  Type5Reused?: number;
  Type6Reused?: number;
  Type7Reused?: number;
}

export interface UserState {
  loading: boolean
  selectedUser: IUser | null
}

const initialState: UserState = {
  loading: false,
  selectedUser: null,
};

export const createUser = createAsyncThunk(
  'users/createUser',
  async (req: { email: string, password: string, name: string }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating user', error);
        // return false;
        alert(error.response.data.message);
      });
  },
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .get(`${SERVER_URL}users/${req.id}`)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting user', error);
        // return false;
        alert(error.response.data.message);
      });
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: User, { dispatch }) => {
    const token = await getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    const { id, ...params } = user;

    dispatch(startUsersLoading());
    return axios
      .patch(`${SERVER_URL}users/${id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when updating user', error);
        if (error.response && error.response.status === 400) {
          // notify with the message from the server
          alert(error.response.data.message);
          throw new Error(error.response.data.message);
        }
        // If the error is not a 400 error, throw a generic error
        throw new Error('Error when updating user');
      });
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .delete(`${SERVER_URL}users/${req.id}`)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when deleting user', error);
        if (error.response && error.response.status === 400) {
          // notify with the message from the server
          alert(error.response.data.message);
          throw new Error(error.response.data.message);
        }
      });
  },
);

export const feedAvatar = createAsyncThunk(
  'users/feedAvatar',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/feedAvatar`)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        dispatch(updateFirstLoginHistory(response.data.loginHistory));
        return response.data.user;
      })
      .catch((error) => {
        console.error('Error when feeding avatar', error);
        return false;
      });
  },
);

export const readInfoCard = createAsyncThunk(
  'login_history/readInfoCard',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}login_history/${req.id}/readInfoCard`)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        dispatch(updateFirstLoginHistory(response.data.loginHistory));
        return response.data.user;
      })
      .catch((error) => {
        console.error('Error when updating green goal', error);
        return false;
      });
  },
);

export const setAvatarFirstTime = createAsyncThunk(
  'users/setAvatarFirstTime',
  async (req: { id: string, avatarID: number }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/setAvatarFirstTime`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        // console.log('response data', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error when setting avatar', error);
        return false;
      });
  },
);

export const buyAvatar = createAsyncThunk(
  'users/buyAvatar',
  async (req: { id: string, avatarID: number }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/buyAvatar`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when buying avatar', error);
        return false;
      });
  },
);

export const equipAvatar = createAsyncThunk(
  'users/equipAvatar',
  async (req: { id: string, avatarID: number }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/equipAvatar`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when equiping avatar', error);
        return false;
      });
  },
);

export const buyAvatarAccessory = createAsyncThunk(
  'users/buyAvatarAccessory',
  async (req: { id: string, accessoryID: number }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/buyAvatarAccessory`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when buying avatar accessory', error);
        return false;
      });
  },
);

export const equipAccessory = createAsyncThunk(
  'users/equipAccessory',
  async (req: { id: string, accessoryID: number }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/equipAccessory`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when equiping avatar accessory', error);
        return false;
      });
  },
);

export const buyAvatarColor = createAsyncThunk(
  'users/buyAvatarColor',
  async (req: { id: string, colorID: number }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/buyAvatarColor`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when buying avatar color', error);
        return false;
      });
  },
);

export const equipColor = createAsyncThunk(
  'users/equipColor',
  async (req: { id: string, colorID: number }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}users/${req.id}/equipColor`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when equiping avatar color', error);
        return false;
      });
  },
);


export const createScan = createAsyncThunk(
  'users/createScan',
  async (req: { scannedBy: string, plasticNumber: number, image: string | null, reused: boolean, recycled: boolean }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .post(`${SERVER_URL}scan/`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        dispatch(updateFirstLoginHistory(response.data.loginHistory));
        return response.data.user;
      })
      .catch((error) => {
        console.error('Error when creating scan', error);
        return false;
      });
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    startUsersLoading: (state) => ({ ...state, loading: true }),
    stopUsersLoading: (state) => ({ ...state, loading: false }),
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
      // alert('Created user as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
      // alert('Retrieved user as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
      // alert('Updated user to: ' + JSON.stringify(action.payload));
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const user: IUser = action.payload as IUser;
      const curSelectedUser = state.selectedUser as IUser;
      if (curSelectedUser.id === user.id) {
        state.selectedUser = null;
      }
      // alert('Deleted user with id ' + user.id);
    });
    builder.addCase(feedAvatar.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(readInfoCard.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(setAvatarFirstTime.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(buyAvatar.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(equipAvatar.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(buyAvatarAccessory.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(equipAccessory.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(buyAvatarColor.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(equipColor.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
    builder.addCase(createScan.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
    });
  },
});

export const { startUsersLoading, stopUsersLoading, setSelectedUser } =
  usersSlice.actions;

export default usersSlice.reducer;
