import styles from './Button.module.scss';

interface Props {
  children: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<Props> = ({ children, onClick, className }) => {
  const btnClass = !className ? styles.root : `${styles.root} ${className}`;

  return (
    <button className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
