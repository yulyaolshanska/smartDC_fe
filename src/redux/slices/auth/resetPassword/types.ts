export default interface ResetPasswordInitialState {
  password?: string;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | null;
}
