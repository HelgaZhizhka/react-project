import styles from './SearchInput.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  handleKeyDown: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  handleKeyDown,
  className,
  placeholder,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleKeyDown(event.currentTarget.value);
    }
  };

  return (
    <input
      className={`${styles.root} ${className}`}
      type="text"
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKey}
      placeholder={placeholder || ''}
      autoFocus
    />
  );
};

export default SearchInput;
