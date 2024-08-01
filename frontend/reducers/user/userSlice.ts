import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Credentials, UserState, User } from './userTypes';

const initialState: UserState = {
  me: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk<User, Credentials, { rejectValue: string }>(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        userId: credentials.userId,
        password: credentials.password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('알 수 없는 오류가 발생했습니다.');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.me = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = '아이디 또는 비밀번호가 일치하지 않습니다.';
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
