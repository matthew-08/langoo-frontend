export type Views = 'chat' | 'discover' | 'settings';

// Auth
export type UserAuthSchema = {
  username: string,
  loggedIn: boolean,
  userId: string | null,
  userImg: string | null,
};
export interface AuthState {
  user: UserAuthSchema
  loading: boolean
  error: string | null
}

export type LoginForm = {
  username: string
  password: string
};

type LanguageChoices = 'japanese' | 'vietnamese' | 'french' | 'chinese' | 'english';

export interface SignUpForm {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  languages: LanguageChoices[],
  nativeLanguage: LanguageChoices
}
