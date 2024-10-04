import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AnalysisPayload, ImagePair, PostState } from './postTypes';
import axios from 'axios';

const initialState: PostState = {
  posts: [],
  analysisLoading: false, // 분석 시도중
  analysisDone: false,
  analysisError: null,
};

export const analysis = createAsyncThunk<ImagePair[], AnalysisPayload, { rejectValue: string }>(
  'post/analysis',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/user/analyze', payload.formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data as ImagePair[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('알 수 없는 오류가 발생했습니다.');
    }
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(analysis.pending, (state) => {
        state.analysisLoading = true;
        state.analysisDone = false;
        state.analysisError = null;
      })
      .addCase(analysis.fulfilled, (state, action: PayloadAction<ImagePair[]>) => {
        state.analysisLoading = false;
        state.analysisDone = true;
        state.posts = action.payload;
      })
      .addCase(analysis.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.analysisLoading = false;
        state.analysisError = '분석에 실패하였습니다.';
      });
  },
});

export default postSlice.reducer;
