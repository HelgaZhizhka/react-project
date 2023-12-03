import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

export const passwordValidation = yup
  .string()
  .required('Password is required')
  .password()
  .minLowercase(1, 'Must contain at least one lowercase letter')
  .minUppercase(1, 'Must contain at least one uppercase letter')
  .minNumbers(1, 'Must contain at least one number')
  .minSymbols(1, 'Must contain at least one special symbol')
  .min(8, 'Password must be at least 8 characters long');
