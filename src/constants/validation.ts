export const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;
export const EMAIL_PATTERN =
  /^(?!\s)(?=.{3,64}$)[a-zA-Z][a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{10,30}$/;
export const PASSWORD_REQUIRED_LENGTH = 10;
