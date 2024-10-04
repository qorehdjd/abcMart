import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import userReducer from '../reducers/user/userSlice';
import postReducer from '../reducers/post/postSlice';

//axios.defaults.baseURL = 'https:localhost:8000';
axios.defaults.withCredentials = true;

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  devTools: true, // DevTools 사용 설정
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
