import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '@/hooks';
import { FormData, validationSchema } from '@/utils/validations';
import { convertToBase64 } from '@/utils/convertImageToBase64';
import { evaluatePasswordStrength } from '@/utils/evaluatePasswordStrength';
import { submitFormData } from '@/store/features/formDataSlice';
import { RoutePaths } from '@/routes/routes.enum';
import { CountryAutocompleteControl } from '@/components/CountryAutocompleteControl';

const ControlForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const password = watch('password');
  const passwordStrength = evaluatePasswordStrength(password);

  const handlerSubmit = async (data: FormData) => {
    const imageBase64 =
      data.image instanceof FileList && data.image.length > 0
        ? await convertToBase64(data?.image[0] as File)
        : null;

    const storeData = {
      ...data,
      image: imageBase64 as string | null,
    };
    dispatch(submitFormData(storeData));
    reset();
    navigate(RoutePaths.HOME);
  };

  return (
    <div className="container page">
      <form className="form form_horizontal" onSubmit={handleSubmit(handlerSubmit)} noValidate>
        <div className="form__row">
          <label className="form__label label" htmlFor="userName">
            Name *:
          </label>
          <input
            className="input"
            type="text"
            {...register('name')}
            id="userName"
            placeholder="You name"
            required
          />
          {errors.name && <span className="form__error">{errors.name.message}</span>}
        </div>
        <div className="form__row">
          <CountryAutocompleteControl {...register('country')} />
          {errors.country && <span className="form__error">{errors.country.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userAge">
            Age *:
          </label>
          <input
            className="input"
            type="number"
            {...register('age')}
            placeholder="Your age"
            id="userAge"
            autoComplete="nop"
            required
          />
          {errors.age && <span className="form__error">{errors.age.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userEmail">
            Email *:
          </label>
          <input
            className="input"
            type="email"
            {...register('email')}
            placeholder="Your email"
            id="userEmail"
            autoComplete="nop"
          />
          {errors.email && <span className="form__error">{errors.email.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userPassword">
            Password *:
          </label>
          <input
            className="input"
            type="password"
            {...register('password')}
            placeholder="Password required"
            id="userPassword"
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
          {errors.password && <span className="form__error">{errors.password.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label label" htmlFor="userConfirmPassword">
            Confirm Password *:
          </label>
          <input
            className="input"
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm your password"
            id="userConfirmPassword"
            required
          />
          {errors.confirmPassword && (
            <span className="form__error">{errors.confirmPassword.message}</span>
          )}
        </div>
        <div className="form__row">
          <label className="form__label label">Gender *:</label>
          <div className="is-flex">
            <label className="label" htmlFor="Man">
              <input
                className="radio"
                type="radio"
                {...register('gender')}
                id="Man"
                value="man"
                defaultChecked
              />
              <span className="label">Man</span>
            </label>
            <label className="label" htmlFor="Woman">
              <input
                className="radio"
                type="radio"
                {...register('gender')}
                id="Woman"
                value="woman"
              />
              <span className="label">Woman</span>
            </label>
          </div>
          {errors.gender && <span className="form__error">{errors.gender.message}</span>}
        </div>
        <div className="form__row">
          <div className="file-upload">
            <label className="label" htmlFor="userImage">
              <input
                className="input"
                type="file"
                {...register('image')}
                id="userImage"
                accept="image/*"
                required
              />
              <span className="button button_md button_bordered">Upload file</span>
            </label>
          </div>
          {errors.image && <span className="form__error">{errors.image.message}</span>}
        </div>
        <div className="form__row">
          <label className="label" htmlFor="userAccept">
            <input
              className="checkbox"
              type="checkbox"
              {...register('acceptTerms')}
              id="userAccept"
              required
            />
            <span className="label">Agree to Terms and Conditions</span>
          </label>
          {errors.acceptTerms && <span className="form__error">{errors.acceptTerms.message}</span>}
        </div>
        <div className="form__footer">
          <button className="button button_md button_primary" type="submit" disabled={!isValid}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlForm;
