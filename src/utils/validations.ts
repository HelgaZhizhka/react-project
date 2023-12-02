import * as yup from 'yup';
import { validateFile } from './validationImage';
import { passwordValidation } from './validationPassword';

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
  country: yup.string().required('Country is required'),

  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .positive('Age must be a positive number')
    .required('Age is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .required('Passwords is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender selection is required'),
  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      return validateFile(value as FileList);
    })
    .test('fileType', 'Invalid file type. Only PNG and JPEG are allowed', (value) => {
      return validateFile(value as FileList);
    })
    .required('Upload image is required'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

export type FormData = Partial<yup.InferType<typeof validationSchema>>;
