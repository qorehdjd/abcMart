import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPost, fetchPosts } from './postAPI';
import { PostState } from './postTypes';

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const addPost = createAsyncThunk('post/addPost', createPost);
export const getPosts = createAsyncThunk('post/getPosts', fetchPosts);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create post';
      })
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postSlice.reducer;
