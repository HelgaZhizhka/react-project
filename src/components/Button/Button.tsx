import styles from './Button.module.scss';

interface Props {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<Props> = ({ children, onClick, className, type = 'button' }) => {
  const btnClass = !className ? styles.root : `${styles.root} ${className}`;

  return (
    <button className={btnClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
