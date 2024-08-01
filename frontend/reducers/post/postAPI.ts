import axios from 'axios';

export const createPost = async (post: { title: string; content: string }) => {
  const response = await axios.post('/api/posts', post);
  return response.data;
};

export const fetchPosts = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};
