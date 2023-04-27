export default interface LoginInitialState {
  email?: string;
  password?: string;
  isLoading: boolean;
  token?: string | null;
  error?: string | null;
}
