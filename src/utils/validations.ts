import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

const passwordValidation = yup
  .string()
  .required('Password is required')
  .password()
  .minLowercase(1, 'Must contain at least one lowercase letter')
  .minUppercase(1, 'Must contain at least one uppercase letter')
  .minNumbers(1, 'Must contain at least one number')
  .minSymbols(1, 'Must contain at least one special symbol')
  .min(8, 'Password must be at least 8 characters long');

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
  country: yup.string().required('Country is required'),
  age: yup.number().positive('Age must be a positive number').required('Age is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .required('Passwords is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender selection is required'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

export type FormData = Partial<yup.InferType<typeof validationSchema>>;
