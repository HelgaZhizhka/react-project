import { useState } from 'react';

import { useAppSelector } from '@/hooks';

const CountryAutocomplete = () => {
  const { countries, loading } = useAppSelector((state) => state.countries);
  const [inputValue, setInputValue] = useState('');

  const filteredCountries = inputValue
    ? countries.filter((country) => country.toLowerCase().includes(inputValue.toLowerCase()))
    : [];

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleClickCountryList: React.MouseEventHandler<HTMLLIElement> = ({ target }) => {
    const { innerText } = target as HTMLLIElement;
    setInputValue(innerText);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label htmlFor="userCountry">Country</label>
      <input
        type="text"
        id="userCountry"
        name="country"
        value={inputValue}
        onChange={handleChange}
        placeholder="Country"
        autoComplete="nope"
      />
      {inputValue && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country} onClick={handleClickCountryList}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
