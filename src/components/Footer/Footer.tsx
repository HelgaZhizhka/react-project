import styles from './Footer.module.scss';

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  const footerClass = !className ? styles.root : `${styles.root} ${className}`;

  return (
    <footer className={footerClass}>
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
};

export default Footer;
