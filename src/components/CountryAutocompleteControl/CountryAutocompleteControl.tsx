import React from 'react';
import { useState } from 'react';

import { CountryList } from '@/components/CountryList';

interface GenericInputProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {}

const CountryAutocompleteControl = React.forwardRef<HTMLInputElement, GenericInputProps>(
  ({ ...props }, ref) => {
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
        <label className="form__label label" htmlFor="userCountry">
          Country
        </label>
        <input
          className="input"
          type="text"
          id="userCountry"
          {...props}
          ref={ref}
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
  }
);

export default CountryAutocompleteControl;
