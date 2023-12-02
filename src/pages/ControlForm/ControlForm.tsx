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
    <div>
      <h1>ControlForm</h1>
      <form className="form" onSubmit={handleSubmit(handlerSubmit)} noValidate>
        <div className="form__row">
          <label className="form__label" htmlFor="userName">
            Name *:
          </label>
          <input type="text" {...register('name')} id="userName" placeholder="You name" required />
          {errors.name && <span className="form__error">{errors.name.message}</span>}
        </div>
        <div className="form__row">
          <CountryAutocompleteControl {...register('country')} />
          {errors.country && <span className="form__error">{errors.country.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="userAge">
            Age *:
          </label>
          <input type="number" {...register('age')} placeholder="Your age" id="userAge" required />
          {errors.age && <span className="form__error">{errors.age.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="userEmail">
            Email *:
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="Your email"
            id="userEmail"
            autoComplete="nop"
          />
          {errors.email && <span className="form__error">{errors.email.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="userPassword">
            Password *:
          </label>
          <input
            type="password"
            {...register('password')}
            placeholder="Password required"
            id="userPassword"
            required
          />
          <span>{passwordStrength}</span>
          {passwordStrength >= 4 ? <span>Strong password 👍</span> : <span>Weak password👎</span>}
          {errors.password && <span className="form__error">{errors.password.message}</span>}
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="userConfirmPassword">
            Confirm Password *:
          </label>
          <input
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
        <div className="form__row form__row_flex">
          <label className="form__label">Gender *:</label>
          <label htmlFor="Man">Man:</label>
          <input type="radio" {...register('gender')} id="Man" value="man" defaultChecked />
          <label className="form__label" htmlFor="Woman">
            Woman:
          </label>
          <input type="radio" {...register('gender')} id="Woman" value="woman" />
          {errors.gender && <span className="form__error">{errors.gender.message}</span>}
        </div>
        <div className="form__row">
          <label htmlFor="userImage">Upload file</label>
          <input type="file" {...register('image')} id="userImage" />
          {errors.gender && <span className="form__error">{errors.gender.message}</span>}
        </div>
        <div className="form__row">
          <label htmlFor="userAccept">
            <input type="checkbox" {...register('acceptTerms')} id="userAccept" required />
            Agree to Terms and Conditions
          </label>
          {errors.acceptTerms && <span className="form__error">{errors.acceptTerms.message}</span>}
        </div>
        <div className="form__footer">
          <button type="submit" disabled={!isValid}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlForm;
