import { useMemo } from 'react';

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

  const handleChangeCountryList: React.MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault;
    onSelect(event.currentTarget.innerText);
    onClose();
  };

  return (
    <ul className={styles.root}>
      {filteredCountries.map((country) => (
        <li className={styles.listItem} key={country} onMouseDown={handleChangeCountryList}>
          {country}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
