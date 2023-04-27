export default interface ForgotPasswordInitialState {
  email?: string;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | null;
}
