import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAppSelector } from '@/hooks';
import styles from './CountryAutocomplete.module.scss';

type Props = {
  className?: string;
};

const CountryAutocomplete: React.FC<Props> = ({ className }) => {
  const { countries, loading } = useAppSelector((state) => state.countries);
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const list = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(
    () => countries.filter((country) => country.toLowerCase().includes(inputValue.toLowerCase())),
    [countries, inputValue]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (list.current && !list.current.contains(event.target as Node)) {
        setShow(false);
      }
    },
    [list]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setInputValue(value);
    setShow(true);
  };

  const handleClickCountryList = useCallback<React.MouseEventHandler<HTMLLIElement>>(
    ({ currentTarget }) => {
      setInputValue(currentTarget.innerText);
      setShow(false);
    },
    []
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.root} ${className ? className : ''}`} ref={list}>
      <label className="form__label" htmlFor="userCountry">
        Country
      </label>
      <input
        type="text"
        id="userCountry"
        name="country"
        value={inputValue}
        onChange={handleChange}
        placeholder="Your country"
        autoComplete="nope"
      />
      {show && (
        <ul className={styles.list}>
          {filteredCountries.map((country) => (
            <li className={styles.listItem} key={country} onClick={handleClickCountryList}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
