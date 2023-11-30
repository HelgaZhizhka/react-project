import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchCountries } from '@/store/features/countriesSlice';

const CountryAutocomplete = () => {
  const dispatch = useAppDispatch();
  const { countries, loading } = useAppSelector((state) => state.countries);
  const [inputValue, setInputValue] = useState('');

  const filteredCountries = inputValue
    ? countries.filter((country) => country.toLowerCase().includes(inputValue.toLowerCase()))
    : [];

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [countries.length, dispatch]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setInputValue(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label htmlFor="userCountry"></label>
      <input
        type="text"
        id="userCountry"
        value={inputValue}
        onChange={handleChange}
        placeholder="Country"
        autoComplete="nope"
      />
      {inputValue && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
