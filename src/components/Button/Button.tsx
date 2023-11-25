import styles from './Button.module.scss';

type Props = {
  onClick?(): void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
} & React.PropsWithChildren;

const Button: React.FC<Props> = (props) => {
  const { onClick, className, type = 'button', disabled, children } = props;
  const btnClass = className ? `${styles.root} ${className}` : styles.root;

  return (
    <button className={btnClass} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
