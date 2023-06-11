export const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;
export const EMAIL_PATTERN =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{10,30}$/;
export const ADDRESS_REGEX = /^[a-zA-Z0-9\s\.,#-]+$/;
export const PASSWORD_REQUIRED_LENGTH = 10;
