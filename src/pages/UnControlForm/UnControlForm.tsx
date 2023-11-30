import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { submitFormData } from '@/store/features/formDataSlice';
import { CountryAutocomplete } from '@/components/CountryAutocomplete';
import { RoutePaths } from '@/routes/routes.enum';

const UnControlForm: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const extractedData = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      age: Number(formData.get('age')) || 0,
      password: formData.get('password') || '',
      gender: formData.get('gender') || '',
      acceptTerms: Boolean(formData.get('accept')),
      country: formData.get('country') || '',
    };

    dispatch(submitFormData(extractedData));
    navigate(RoutePaths.HOME);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CountryAutocomplete />
      <label htmlFor="userName">
        Name:
        <input type="text" id="userName" name="name" />
      </label>
      <label htmlFor="userAge">
        Age:
        <input type="number" id="userAge" name="age" />
      </label>
      <label htmlFor="userEmail">
        Email:
        <input type="email" id="userEmail" name="email" />
      </label>
      <label>
        Password:
        <input type="password" id="userPassword" name="password" />
      </label>
      <label>
        Confirm Password:
        <input type="password" id="userConfirmPassword" name="confirmPassword" />
      </label>
      <label htmlFor="Man">
        Man:
        <input type="radio" id="Man" name="gender" value="man" />
      </label>
      <label htmlFor="Woman">
        Woman:
        <input type="radio" id="Woman" name="gender" value="woman" />
      </label>
      <label htmlFor="userAccept">
        <input type="checkbox" name="accept" id="userAccept" />
        Agree to Terms and Conditions
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default UnControlForm;
