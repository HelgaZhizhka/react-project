import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.root}>
    <div className="container">
      <p>
        © 2023
        <a className={styles.link} href="https://rollingscopes.com/">
          The Rolling Scopes
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
