export interface Post {
  id: string;
  title: string;
  content: string;
}

export interface PostState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
