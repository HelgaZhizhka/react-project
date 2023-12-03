import { UpdateFormData } from '@/store/features/formDataSlice';
import styles from './Gallery.module.scss';

type Props = {
  data: UpdateFormData[];
};
const Gallery: React.FC<Props> = ({ data }) => (
  <ul className={styles.root}>
    {data.length > 0 &&
      [...data].reverse().map((item, index) => (
        <li className={`${styles.item} ${index === 0 ? styles.animate : ''} `} key={index}>
          <ul className={styles.list}>
            {item.name && (
              <li>
                <span className="label">User name:</span> {item.name}
              </li>
            )}
            {item.email && (
              <li>
                <span className="label">User email:</span> {item.email}
              </li>
            )}
            {item.country && (
              <li>
                <span className="label">User country: </span>
                {item.country}
              </li>
            )}
            {item.age && (
              <li>
                <span className="label">User age: </span>
                {item.age}
              </li>
            )}
            {item.password && (
              <li>
                {' '}
                <span className="label">User password: </span>
                {item.password}
              </li>
            )}
            {item.gender && (
              <li>
                <span className="label">User gender: </span>
                {item.gender}
              </li>
            )}
            <li>{item.image && <img src={item.image} alt={item.name} />}</li>
            <li>{item.acceptTerms ? 'User accept terms' : 'User no accept terms'}</li>
          </ul>
        </li>
      ))}
  </ul>
);

export default Gallery;
