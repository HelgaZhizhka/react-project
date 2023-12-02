import { useRef, useState, useEffect, useCallback } from 'react';

import { CountryList } from '@/components/CountryList';
import styles from './CountryAutocompleteNoControl.module.scss';

const CountryAutocompleteNoControl: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const list = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (list.current && !list.current.contains(event.target as Node)) {
        closeList();
      }
    },
    [list]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className={styles.root} ref={list}>
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
      {isOpen && (
        <CountryList inputValue={inputValue} onSelect={handlerSelectList} onClose={closeList} />
      )}
    </div>
  );
};

export default CountryAutocompleteNoControl;
