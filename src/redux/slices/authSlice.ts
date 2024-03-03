/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { SERVER_URL } from 'utils/constants.js';
import axios from 'axios';
import { getBearerToken, setBearerToken } from 'utils/asyncStorage';
import { IUser, UserScopes } from 'types/users';
import { setLoginHistory } from './loginhistorySlice';
import { LoginHistory } from 'types/loginHistory';

export interface AuthState {
  authenticated: boolean
  loading: boolean
  user: IUser | null;
  loginHistory: LoginHistory[];
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  user: null,
  loginHistory: [],
};

interface LoginResponse {
  token: string
  user: IUser
  history: LoginHistory[]
}

export const setCredentials = createAsyncThunk(
  'setCredentials',
  async (token: string) => {
    await setBearerToken(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
);

export const initCredentials = createAsyncThunk(
  'initCredentials',
  async (req: unknown, { dispatch }) => {
    await getBearerToken().then((token: string | null | undefined) => {
      if (token) {
        dispatch(setCredentials(token));
      } else dispatch(logout({}));
    });
  },
);

export const signUp = createAsyncThunk(
  'auth/signup',
  async (credentials: { email: string, password: string, username: string }, { dispatch }) => {
    dispatch(startAuthLoading());
    return axios
      .post(`${SERVER_URL}auth/signup`, credentials)
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        alert('Sign up successful!');
        dispatch(setLoginHistory(response.data.history));
        //////////// Question:
        ///was not in the original template.. why not dispatch the token here?
        ////////////
        // dispatch(setCredentials(response.data.token));
        return response.data;
      })
      .catch((error) => {
        console.error('Error when signing up', error);
        return false;
      });
  },
);

export const signIn = createAsyncThunk(
  'auth/signin',
  async (credentials: { email: string, password: string }, { dispatch }) => {
    dispatch(startAuthLoading());
    return axios
      .post<LoginResponse>(`${SERVER_URL}auth/signin`, credentials)
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        if (response.status == 403) {
          // forbidden - not verified
          return {
            user: { email: credentials.email },
            LoginHistory: [],
            verified: false,
          };
        }
        dispatch(setLoginHistory(response.data.history));
        dispatch(setCredentials(response.data.token));
        alert('Signed In!');
        return response.data;
      })
      .catch((error) => {
        alert(
          'Unable to log in, please ensure your email and password are correct.',
        );
        console.error('Error when logging in', error);
        throw error;
      });
  },
);

export const jwtSignIn = createAsyncThunk(
  'auth/jwt-signin',
  async (req: unknown, { dispatch }) => {
    const token = await getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    
    dispatch(startAuthLoading());
    return axios
      .get<LoginResponse>(`${SERVER_URL}auth/jwt-signin/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        if (token) {
          dispatch(setCredentials(token));
        }
        dispatch(setLoginHistory(response.data.history));
        return response.data;
      })
      .catch((err) => {
        console.error(err);
        alert('Your login session has expired.');
        throw err;
      });
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (req: unknown, { dispatch }) => {
    dispatch(startAuthLoading());
    return axios
      .post(`${SERVER_URL}auth/logout`)
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        dispatch(setCredentials(''));
        return response.data;
      })
      .catch((err) => {
        console.error('Logout attempt failed', err);
        throw err;
      });
  },
);

export const resendCode = createAsyncThunk(
  'auth/resend-code',
  async (req: { id: string, email: string }) => {
    return axios
      .post<LoginResponse>(`${SERVER_URL}auth/resend-code/${req.id}`, req)
      .then((response) => {
        if (response.status === 201) {
          return true;
        }
        return isRejectedWithValue(response.statusText);
      })
      .catch((error) => {
        console.error('Error when sending code', error);
      });
  },
);

export const verify = createAsyncThunk(
  'auth/verify',
  async (req: { id: string, email: string, code: string }) => {
    return axios
      .patch<LoginResponse>(`${SERVER_URL}auth/verify/${req.id}`, req)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when verifying', error);
      });
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuthLoading: (state) => ({ ...state, loading: true }),
    stopAuthLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      if ('token' in action.payload) {
        state.user = action.payload.user;
        state.authenticated = true;
        return state;
      }
    });
    builder.addCase(jwtSignIn.fulfilled, (state, action) => {
      // state = ({ ...state, ...action.payload.user });
      state.user = action.payload.user;
      state.authenticated = true;
      return state;
    });
    builder.addCase(jwtSignIn.rejected, () => initialState);
    builder.addCase(logout.fulfilled, () => {
      alert('Logged out of account');
      return initialState;
    });
    builder.addCase(resendCode.fulfilled, () => {
      alert('Code sent to your email');
    });
    builder.addCase(resendCode.rejected, () => {});
    builder.addCase(verify.fulfilled, (state, action) => {
      if (action.payload != null) {
        setBearerToken(action.payload.token);
        // state = ({ ...state, ...action.payload.user });
        state.user = action.payload.user;
        state.authenticated = true;
      }
      alert('Your account has been authorized!');
      return state;
    });
  },
});

export const { startAuthLoading, stopAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
