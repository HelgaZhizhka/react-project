import { FormData } from '@/types/types';
import styles from './Gallery.module.scss';

type Props = {
  data: FormData[];
};
const Gallery: React.FC<Props> = ({ data }) => (
  <div className={styles.root}>
    {data.length > 0 &&
      data.map((item, index) => (
        <div
          className={`${styles.item} ${index === data.length - 1 ? styles.animate : ''} `}
          key={index}
        >
          <h2>{item.name}</h2>
          <p>{item.email}</p>
          <p>{item.country}</p>
          <p>{item.age}</p>
          <p>{item.password}</p>
          <p>{item.gender}</p>
          <p>{item.acceptTerms ? 'accept terms' : 'no accept terms'}</p>
        </div>
      ))}
  </div>
);

export default Gallery;
