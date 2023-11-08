import { useState, useEffect } from 'react';

import { Button } from '@/components/Button';
import styles from './ErrorComponent.module.scss';

interface Props {
  className: string;
}

const ErrorComponent: React.FC<Props> = ({ className }) => {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  useEffect(() => {
    if (throwError) {
      throw new Error('I crashed!');
    }
  }, [throwError]);

  return (
    <Button className={`${styles.button} ${className}`} onClick={handleClick}>
      Trigger Error
    </Button>
  );
};

export default ErrorComponent;
