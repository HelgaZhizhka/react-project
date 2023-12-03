import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

import { useAppDispatch } from '@/hooks';
import { submitFormData } from '@/store/features/formDataSlice';
import { validationSchema } from '@/utils/validations';
import { convertToBase64 } from '@/utils/convertImageToBase64';
import { RoutePaths } from '@/routes/routes.enum';
import { CountryAutocompleteNoControl } from '@/components/CountryAutocompleteNoControl';
import { evaluatePasswordStrength } from '@/utils/evaluatePasswordStrength';

const UnControlForm: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    }

    const formData = new FormData(form);
    try {
      const imageFile = formData.get('image') as File | null;

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

      const validationData = await validationSchema.validate(
        { ...data, image: [imageFile] },
        { abortEarly: false }
      );

      const imageBase64 = imageFile ? await convertToBase64(imageFile) : null;

      const storeData = {
        ...validationData,
        image: imageBase64 as string,
      };

      dispatch(submitFormData(storeData));
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

  const handlerChangePassword: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const strengthPassword = evaluatePasswordStrength(value);
    setPasswordStrength(strengthPassword);
  };

  return (
    <div className="container page">
      <form className="form form_horizontal" onSubmit={handleSubmit} ref={formRef} noValidate>
        <div className="form__row">
          <label className="form__label label" htmlFor="userName">
            Name:
          </label>
          <input className="input" type="text" id="userName" name="name" required />
          {errors.name && <span className="form__error">{errors.name}</span>}
        </div>
        <div className="form__row">
          <CountryAutocompleteNoControl />
          {errors.country && <span className="form__error">{errors.country}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userAge">
            Age:
          </label>
          <input
            className="input"
            type="number"
            id="userAge"
            name="age"
            autoComplete="nop"
            required
          />
          {errors.age && <span className="form__error">{errors.age}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userEmail">
            Email:
          </label>
          <input
            className="input"
            type="email"
            id="userEmail"
            name="email"
            autoComplete="nop"
            required
          />
          {errors.email && <span className="form__error">{errors.email}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userPassword">
            Password:
          </label>
          <input
            className="input"
            type="password"
            id="userPassword"
            name="password"
            onChange={handlerChangePassword}
            required
          />
          {passwordStrength > 0 && (
            <span className="is-flex">
              <span className="form__text">{passwordStrength}</span>
              {passwordStrength >= 4 ? (
                <span className="form__text text-success">Strong password 👍</span>
              ) : (
                <span className="form__text text-error">Weak password 👎</span>
              )}
            </span>
          )}
          {errors.password && <span className="form__error">{errors.password}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userConfirmPassword">
            Confirm Password:
          </label>
          <input
            className="input"
            type="password"
            id="userConfirmPassword"
            name="confirmPassword"
            required
          />
          {errors.confirmPassword && <span className="form__error">{errors.confirmPassword}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label">Gender *:</label>
          <div className="is-flex">
            <label className="label" htmlFor="Man">
              <input
                className="radio"
                type="radio"
                id="Man"
                name="gender"
                value="man"
                defaultChecked
              />
              <span className="label">Man</span>
            </label>
            <label className="label" htmlFor="Woman">
              <input className="radio" type="radio" id="Woman" name="gender" value="woman" />
              <span className="label">Woman</span>
            </label>
          </div>
          {errors.gender && <span className="form__error">{errors.gender}</span>}
        </div>
        <div className="form__row">
          <div className="file-upload">
            <label className="label" htmlFor="userImage">
              <input type="file" name="image" id="userImage" accept="image/*" required />
              <span className="button button_md button_bordered">Upload file</span>
            </label>
          </div>
          {errors.image && <span className="form__error">{errors.image}</span>}
        </div>
        <div className="form__row">
          <label className="label" htmlFor="userAccept">
            <input
              className="checkbox"
              type="checkbox"
              name="acceptTerms"
              id="userAccept"
              required
            />
            <span className="label">Agree to Terms and Conditions</span>
          </label>
          {errors.acceptTerms && <span className="form__error">{errors.acceptTerms}</span>}
        </div>
        <div className="form__footer">
          <button className="button button_md button_primary" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnControlForm;
