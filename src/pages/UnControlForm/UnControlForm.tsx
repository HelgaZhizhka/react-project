import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { submitFormData } from '@/store/features/formDataSlice';
import { validationSchema } from '@/utils/validations';
import { RoutePaths } from '@/routes/routes.enum';
import { CountryAutocompleteNoControl } from '@/components/CountryAutocompleteNoControl';
import { ValidationError } from 'yup';

const UnControlForm: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);
    try {
      const data = {
        name: formData.get('name') || '',
        country: formData.get('country') || '',
        age: Number(formData.get('age')) || 0,
        email: formData.get('email') || '',
        password: formData.get('password') || '',
        confirmPassword: formData.get('confirmPassword') || '',
        gender: formData.get('gender') || '',
        acceptTerms: Boolean(formData.get('acceptTerms')),
      };

      const validateData = await validationSchema.validate(data, { abortEarly: false });

      dispatch(submitFormData(validateData));
      navigate(RoutePaths.HOME);
    } catch (error) {
      const validationErrors: Record<string, string> = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((e) => {
          if (e.path) validationErrors[e.path] = e.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} ref={formRef} noValidate>
      <div className="form__row">
        <label className="form__label" htmlFor="userName">
          Name:
        </label>
        <input type="text" id="userName" name="name" />
        {errors.name && <span className="form__error">{errors.name}</span>}
      </div>
      <div className="form__row">
        <CountryAutocompleteNoControl />
        {errors.country && <span className="form__error">{errors.country}</span>}
      </div>
      <div className="form__row">
        <label className="form__label" htmlFor="userAge">
          Age:
        </label>
        <input type="number" id="userAge" name="age" />
        {errors.age && <span className="form__error">{errors.age}</span>}
      </div>
      <div className="form__row">
        <label className="form__label" htmlFor="userEmail">
          Email:
        </label>
        <input type="email" id="userEmail" name="email" />
        {errors.email && <span className="form__error">{errors.email}</span>}
      </div>
      <div className="form__row">
        <label className="form__label" htmlFor="userPassword">
          Password:
        </label>
        <input type="password" id="userPassword" name="password" />
        {errors.password && <span className="form__error">{errors.password}</span>}
      </div>
      <div className="form__row">
        <label className="form__label" htmlFor="userConfirmPassword">
          Confirm Password:
        </label>
        <input type="password" id="userConfirmPassword" name="confirmPassword" />
        {errors.confirmPassword && <span className="form__error">{errors.confirmPassword}</span>}
      </div>
      <div className="form__row form__row_flex">
        <label className="form__label" htmlFor="Man">
          Man:
        </label>
        <input type="radio" id="Man" name="gender" value="man" defaultChecked />
        <label className="form__label" htmlFor="Woman">
          Woman:
        </label>
        <input type="radio" id="Woman" name="gender" value="woman" />
        {errors.gender && <span className="form__error">{errors.gender}</span>}
      </div>
      <div className="form__row">
        <label htmlFor="userAccept">
          <input type="checkbox" name="acceptTerms" id="userAccept" />
          Agree to Terms and Conditions
        </label>
        {errors.acceptTerms && <span className="form__error">{errors.acceptTerms}</span>}
      </div>
      <div className="form__footer">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default UnControlForm;
