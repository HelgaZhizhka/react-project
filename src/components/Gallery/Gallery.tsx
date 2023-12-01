import { FormData } from '@/utils/validations';
import styles from './Gallery.module.scss';

type Props = {
  data: FormData[];
};
const Gallery: React.FC<Props> = ({ data }) => (
  <div className={styles.root}>
    {data.length > 0 &&
      [...data].reverse().map((item, index) => (
        <div className={`${styles.item} ${index === 0 ? styles.animate : ''} `} key={index}>
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
