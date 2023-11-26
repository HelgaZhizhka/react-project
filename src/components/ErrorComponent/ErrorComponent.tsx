import { useState } from 'react';

import { Button } from '@/components/Button';
import Error from '@/pages/_error';
import styles from './ErrorComponent.module.scss';

type Props = {
  className: string;
};

const ErrorComponent: React.FC<Props> = ({ className }) => {
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(true);
    console.error('I am an crashed!');
  };

  return (
    <>
      {isError && <Error statusCode={300} />}
      <Button className={`${styles.button} ${className}`} onClick={handleClick}>
        Trigger Error
      </Button>
    </>
  );
};

export default ErrorComponent;
