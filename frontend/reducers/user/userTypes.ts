export interface User {
  userId: string;
}

export interface UserState {
  me: User | null;
  logInLoading: Boolean; // 로그인 시도중
  logInDone: Boolean;
  logInError: null | string;
}

export interface Credentials {
  userId: string;
  password: string;
}
