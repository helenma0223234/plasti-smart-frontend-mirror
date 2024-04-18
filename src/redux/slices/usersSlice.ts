import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from 'utils/constants.js';
import axios from 'axios';
import { UserScopes, IUser } from 'types/users.jsx';
import { updateFirstLoginHistory } from './loginhistorySlice';

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
        return false;
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
        return false;
      });
  },
);

// export const updateUser = createAsyncThunk(
//   'users/updateUser',
//   async (req: { id: string, email: string, password: string, role: UserScopes }, { dispatch }) => {
//     dispatch(startUsersLoading());
//     return axios
//       .patch(`${SERVER_URL}users/${req.id}`, req)
//       .finally(() => dispatch(stopUsersLoading()))
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         console.error('Error when updating user', error);
//         return false;
//       });
//   },
// );

// subject to change!!
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (req: { 
    id: string, 
    name?: string, 
    email?: string, 
    username?: string, 
    pronoun?: string, 
    avatar?: number, 
    teamID?: string, 
    lastLogin?: string, 
    avatarHealth?: number, 
    monthlyTotalScans?: number, 
    snacks?: number,
    Type1Collected?: number, 
    Type2Collected?: number, 
    Type3Collected?: number, 
    Type4Collected?: number, 
    Type5Collected?: number, 
    Type6Collected?: number, 
    Type7Collected?: number,
    monthlyGoalPlasticType?: number, 
    monthlyGoalPlasticAmount?: number, 
    monthlyGoalPlasticTotal?: number
  }, { dispatch }) => {
    dispatch(startUsersLoading());
    return axios
      .patch(`${SERVER_URL}users/${req.id}`, req)
      .finally(() => dispatch(stopUsersLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when updating user', error);
        return false;
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
        return false;
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

export const createScan = createAsyncThunk(
  'users/createScan',
  async (req: { scannedBy: string, plasticNumber: number, plasticLetter: string, image: string | null }, { dispatch }) => {
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
      alert('Created user as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
      alert('Retrieved user as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload as IUser;
      alert('Updated user to: ' + JSON.stringify(action.payload));
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const user: IUser = action.payload as IUser;
      const curSelectedUser = state.selectedUser as IUser;
      if (curSelectedUser.id === user.id) {
        state.selectedUser = null;
      }
      alert('Deleted user with id ' + user.id);
    });
    builder.addCase(feedAvatar.fulfilled, (state, action) => {
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
