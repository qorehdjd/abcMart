export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  me: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface Credentials {
  userId: string;
  password: string;
}
