import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/hooks';
import styles from './CountryList.module.scss';

type Props = {
  inputValue: string;
  onSelect(value: string): void;
  onClose(): void;
};

const CountryList: React.FC<Props> = ({ inputValue, onClose, onSelect }) => {
  const { countries } = useAppSelector((state) => state.countries);

  const filteredCountries = useMemo(
    () => countries.filter((country) => country.toLowerCase().includes(inputValue.toLowerCase())),
    [countries, inputValue]
  );

  const handleClickCountryList = useCallback<React.MouseEventHandler<HTMLLIElement>>(
    ({ currentTarget }) => {
      onSelect(currentTarget.innerText);
      onClose();
    },
    [onSelect, onClose]
  );

  return (
    <ul className={styles.root}>
      {filteredCountries.map((country) => (
        <li className={styles.listItem} key={country} onClick={handleClickCountryList}>
          {country}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
