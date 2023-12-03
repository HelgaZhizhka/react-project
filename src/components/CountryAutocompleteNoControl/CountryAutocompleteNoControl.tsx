import { useState } from 'react';

import { CountryList } from '@/components/CountryList';

const CountryAutocompleteNoControl: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const closeList = () => {
    setIsOpen(false);
  };

  const openList = () => {
    setIsOpen(true);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setInputValue(value);
    openList();
  };

  const handlerSelectList = (value: string) => {
    setInputValue(value);
    closeList();
  };

  return (
    <>
      <input
        className="input"
        type="text"
        id="userCountry"
        name="country"
        value={inputValue}
        onChange={handleChange}
        placeholder="Your country"
        autoComplete="nope"
      />
      {isOpen && (
        <CountryList inputValue={inputValue} onSelect={handlerSelectList} onClose={closeList} />
      )}
    </>
  );
};

export default CountryAutocompleteNoControl;
