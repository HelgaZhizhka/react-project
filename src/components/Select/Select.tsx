import { useRouter } from 'next/router';

import { currentPage, perPage } from '@/lib/types/constants';
import styles from './Select.module.scss';

interface Props {
  value: number;
  className?: string;
}

const Select: React.FC<Props> = ({ value, className }) => {
  const router = useRouter();
  const { query, page = currentPage } = router.query;
  const selectClass = className ? `${styles.root} ${className}` : styles.root;

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
    if (query) {
      router.push(`/?query=${query}&page=${page}&per_page=${value}`);
    } else {
      router.push(`/?page=${page}&per_page=${value}`);
    }
  };

  return (
    <select className={selectClass} value={value} onChange={handleChange}>
      {perPage.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
