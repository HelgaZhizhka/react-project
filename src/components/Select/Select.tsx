import { PER_PAGE } from './Select.enums';
import styles from './Select.module.scss';

interface Props {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const Select: React.FC<Props> = ({ onChange, value, className }) => {
  const selectClass = !className ? styles.root : `${styles.root} ${className}`;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);
    onChange(newPerPage);
  };

  return (
    <select className={selectClass} value={value} onChange={handleChange}>
      <option value={PER_PAGE[10]}>{PER_PAGE[10]}</option>
      <option value={PER_PAGE[20]}>{PER_PAGE[20]}</option>
      <option value={PER_PAGE[30]}>{PER_PAGE[30]}</option>
      <option value={PER_PAGE[40]}>{PER_PAGE[40]}</option>
      <option value={PER_PAGE[50]}>{PER_PAGE[50]}</option>
    </select>
  );
};

export default Select;
