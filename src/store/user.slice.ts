import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { LoginResponse } from '../interfaces/auth.interface';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { Profile } from '../interfaces/user.interface';
import { RootState } from './store';

export const USER_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
  id: number | null;
}

export interface UserState {
  jwt: string | null;
  id: number | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  profile?: Profile;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(USER_PERSISTENT_STATE)?.jwt ?? null,
  id: loadState<UserPersistentState>(USER_PERSISTENT_STATE)?.id ?? null,
};

export const login = createAsyncThunk('user/login', async (params: { email: string; password: string }) => {
  try {
    const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth`, {
      email: params.email,
      password: params.password,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
});

export const register = createAsyncThunk(
  'user/register',
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/register`, {
        email: params.email,
        password: params.password,
        name: params.name,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  'user/getProfile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}/auth_me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.id = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.token;
      state.id = action.payload.data.id;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.token;
      state.id = action.payload.data.id;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
